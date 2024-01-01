"use client";

import { FileState } from "@/components/ui/MultiImageDropZone";
import React, { useEffect, useState } from "react";
import { useEdgeStore } from "./edgstore";

export default function useMultiFileUpload(initURLs?: string[]) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [deletedUrls, setDeletedUrls] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    const states: FileState[] = [];

    initURLs?.map((url) => {
      const state: FileState = {
        file: url,
        key: Math.random().toString(36).slice(2),
        progress: "COMPLETE",
      };

      states.push(state);
    });

    setFileStates(states);
  }, [initURLs]);

  function handleFileChange(files: FileState[]) {
    setFileStates(files);
  }

  function handleFileDelete(deletedFile: string | File) {
    setFileStates(
      fileStates.filter((fileState) => fileState.file != deletedFile)
    );

    if (typeof deletedFile === "string") {
      setDeletedUrls((prev) => [...prev, deletedFile]);
    }
  }

  async function handleFilesAdded(addedFiles: FileState[]) {
    // Uploaded Files State updated
    setFileStates([...fileStates, ...addedFiles]);

    // Loop files & upload
    await Promise.all(
      addedFiles.map(async (addedFileState) => {
        try {
          if (
            addedFileState.progress !== "PENDING" ||
            typeof addedFileState.file === "string"
          ) {
            return;
          }
          const res = await edgestore.publicFiles.upload({
            file: addedFileState.file,
            input: {
              type: "recipe",
            },
            options: {
              temporary: true,
            },
            onProgressChange: async (progress) => {
              updateFileProgress(addedFileState.key, progress);
              if (progress === 100) {
                // wait 1 second to set it to complete
                // so that the user can see the progress bar at 100%
                await new Promise((resolve) => setTimeout(resolve, 1000));
                updateFileProgress(addedFileState.key, "COMPLETE");
              }
            },
          });
          setImageUrls((prev) => [...prev, res.url]);
          console.log("New Image", addedFileState);
        } catch (err) {
          updateFileProgress(addedFileState.key, "ERROR");
        }
      })
    );
  }

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  function getURLs() {
    // 1) Create State - Take from "imageUrls" directly & no need to worry for deleted Urls as they're temp

    // 2) Update State -
    // 2.1) No changes to images - imageUrls will be empty, send the initUrls instead (check initUrls to fileState urls)
    if (
      imageUrls.length === 0 &&
      initURLs &&
      initURLs.length > 0 &&
      deletedUrls.length === 0
    ) {
      return initURLs;
    }

    // 2.3) Uploads new image(s) - include uploaded url(s)
    let urls: string[] = imageUrls.concat(initURLs || []);

    // 2.3) Removes existing image(s) - add url to deleteUrls, remove from imageUrls (if been uploaded) & filter differences

    if (deletedUrls) {
      // Looping in urls
      for (let i = 0; i < urls.length; i++) {
        // looping in Deleted
        for (let j = 0; j < deletedUrls.length; j++) {
          if (urls[i] == deletedUrls[j]) {
            urls = urls.filter((url) => url != deletedUrls[j]);
            console.log(deletedUrls);
          }
        }
      }
    }

    console.log("Init URLS: ", initURLs);
    console.log("ImageUrls", imageUrls);
    return urls;
  }

  return {
    getURLs,
    fileStates,
    deletedUrls,
    handleFileChange,
    handleFileDelete,
    handleFilesAdded,
  };
}
