"use client";
// FIX Edgestore Delete Error!

import React, { useState } from "react";
import { MaxImageSize } from "@/lib/utils";
import { useEdgeStore } from "@/lib/edgstore";
import { SingleImageDropzone } from "./ui/SingleImageDropZone";
import { Button } from "./ui/button";
import { DeleteImage, FileRes } from "@/app/actions/ImageActions";
import Image from "next/image";
import { Progress } from "./ui/progress";

interface props {
  type: "recipe" | "profile";
  setUploadedImage: React.Dispatch<React.SetStateAction<FileRes | null>>;
  uploadedImage: FileRes | null;
}

export default function ImageUploader({
  type,
  uploadedImage,
  setUploadedImage,
}: props) {
  // Utils
  const { edgestore } = useEdgeStore();

  // Resulting state
  const [file, setFile] = useState<File>();
  // const [uploadedImage, setUploadedImage] = useState<FileRes | null>(initImage);
  const [progress, setProgress] = useState<number | null>(null);

  const uploadFile = async (options?: { replaceTargetUrl?: string }) => {
    try {
      if (!file) {
        return;
      }
      const newFileData = await edgestore.publicFiles.upload({
        file,
        input: {
          type: type,
        },
        onProgressChange: (progress) => {
          setProgress(progress);
          if (progress === 100) {
            setTimeout(() => {
              setProgress(null);
            }, 1000);
          }
        },
        options: {
          replaceTargetUrl: options?.replaceTargetUrl,
        },
      });

      const parsedNewFile: FileRes = {
        ...newFileData,
        base64Url: URL.createObjectURL(file),
      };

      setUploadedImage(parsedNewFile);

      setFile(undefined);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-between gap-10">
      <div className="flex justify-center items-center gap-3 flex-col w-full">
        {uploadedImage == null && (
          <SingleImageDropzone
            width={500}
            height={500}
            value={file}
            dropzoneOptions={{ maxSize: MaxImageSize }}
            onChange={(file) => {
              setFile(file);
            }}
          />
        )}
        {uploadedImage != null && (
          <ImageFileBlock
            fileData={uploadedImage}
            // when the newFile is set, the replace button will be shown
            newFile={progress !== null ? undefined : file}
            onDelete={async (fileData) => {
              try {
                await DeleteImage(fileData.url);
                setUploadedImage(null);
              } catch (e) {
                console.log("Error: ", e);
              }
            }}
            onReplace={async (originalFile) => {
              await uploadFile({
                replaceTargetUrl: originalFile.url,
              });
            }}
          />
        )}

        {progress != null && (
          <Progress value={progress} className="w-full h-5" />
        )}

        {uploadedImage == null && (
          <Button
            onClick={() => uploadFile()}
            disabled={!file || progress != null}
          >
            Upload
          </Button>
        )}
      </div>
    </div>
  );
}

function ImageFileBlock(params: {
  fileData: FileRes;
  newFile?: File;
  onDelete?: (fileData: FileRes) => void | Promise<void>;
  onReplace?: (originalFile: FileRes, newFile: File) => void | Promise<void>;
}) {
  const { fileData, newFile, onDelete, onReplace } = params;
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Image
        // fill
        sizes="500px"
        width={500}
        height={500}
        className="rounded-lg w-auto h-auto"
        src={fileData.base64Url ?? fileData.thumbnailUrl ?? fileData.url}
        alt="Uploaded Image"
      />
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <>
          <Button
            onClick={async () => {
              try {
                setLoading(true);
                await onDelete?.(fileData);
              } finally {
                setLoading(false);
              }
            }}
          >
            Delete
          </Button>
          {newFile && (
            <Button
              onClick={async () => {
                try {
                  setLoading(true);
                  await onReplace?.(fileData, newFile);
                } finally {
                  setLoading(false);
                }
              }}
            >
              Replace
            </Button>
          )}
        </>
      )}
    </div>
  );
}
