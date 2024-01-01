"use client";

import {
  MultiImageDropzone,
  type FileState,
} from "@/components/ui/MultiImageDropZone";
import useMultiFileUpload from "@/lib/useMultiFileUpload";
import { Dispatch, SetStateAction, useState } from "react";

interface props {
  //   fileStates: FileState[];
  //   setFileStates: Dispatch<SetStateAction<FileState[]>>;
}

export function MultiImageDropzoneInput({}: props) {
  const { fileStates, handleFileChange, handleFileDelete, handleFilesAdded } =
    useMultiFileUpload();

  return (
    <div className="w-full">
      <MultiImageDropzone
        className="w-full"
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 6,
        }}
        onChange={(files) => handleFileChange(files)}
        // Test MEE!!!
        onFileDelete={(file) => handleFileDelete(file)}
        onFilesAdded={async (addedFiles) => await handleFilesAdded(addedFiles)}
      />
    </div>
  );
}
