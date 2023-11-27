"use server";
import { env } from "~/env.mjs";

export const generateImage = async () => {
  "use server";
  // const response = await fetch("/api/predictions", {
  //   method: "POST",
  //   body: JSON.stringify({ prompt: "YEssir" }),
  // });
  // console.log(response);

  console.log(env.REPLICATE_API_TOKEN);
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Pinned to a specific version of Stable Diffusion
      // See https://replicate.com/stability-ai/sdxl
      version:
        "2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2",

      // This is the text prompt that will be submitted by a form on the frontend
      input: { prompt: "Realistic Cheese Cake" },
    }),
  });

  const prediction: unknown = await response.json();
  console.log(prediction);
};
