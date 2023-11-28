"use server";
import { env } from "~/env.mjs";
import Replicate from "replicate";

export const generateImage = async (title: string) => {
  "use server";

  const replicate = new Replicate({ auth: env.REPLICATE_API_TOKEN });

  const prompt = `Create a photorealistic image of a plate of ${title} on a kitchen counter. The plate should be round and made of Ceramic. The ${title} shoult be arranged centered. The kitchen counter should be marble and have with appliances. The lighting should be natural light.`;

  const model =
    "stability-ai/sdxl:2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2";
  const input = { prompt: prompt };
  // Evalute return type
  const prediction: string[] | object = await replicate.run(model, {
    input,
  });

  return prediction;

  // const output = await replicate.run(
  //   "",
  //   {
  //     input: {
  //       width: 1024,
  //       height: 1024,
  //       prompt: "Realist Carrot Cake",
  //       refine: "no_refiner",
  //       scheduler: "DDIM",
  //       num_outputs: 1,
  //       guidance_scale: 7.5,
  //       high_noise_frac: 0.8,
  //       negative_prompt: "",
  //       prompt_strength: 0.8,
  //       num_inference_steps: 50,
  //     },
  //   },
  // );
};
