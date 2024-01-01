"use server";

import {
  ClientResponse,
  edgeStoreClient,
} from "../api/edgestore/[...edgestore]/route";

// EdgeStore request
export type FileRes =
  ClientResponse["publicFiles"]["listFiles"]["data"][number] & {
    base64Url?: string;
  };

/**
 *
 * @param author User
 * @param url  String
 * @returns Single Recipe Image from User
 */
export async function GetRecipeImage(author: string, url: string) {
  const res = await edgeStoreClient.publicFiles.listFiles({
    filter: {
      path: { author: author, type: "recipe" },
    },
  });

  const image = res.data.find((img) => {
    img.url == url;
  });
  return image || null;
}

export async function DeleteImage(imageUrl: string) {
  return await edgeStoreClient.publicFiles.deleteFile({ url: imageUrl });
}

export async function UploadImage(imageUurl: string) {
  const res = await edgeStoreClient.publicFiles.confirmUpload
}
