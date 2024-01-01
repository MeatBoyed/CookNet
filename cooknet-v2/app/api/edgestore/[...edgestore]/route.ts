import { z, object } from "zod";
import { MaxImageSize } from "@/lib/utils";
import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { currentUser } from "@clerk/nextjs";
import {
  InferClientResponse,
  initEdgeStoreClient,
} from "@edgestore/server/core";

type Context = {
  userId: string;
};

async function createContext(): Promise<Context> {
  const user = await currentUser(); // replace with your own session logic

  return {
    userId: user?.id || "",
  };
}

const es = initEdgeStore.context<Context>().create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es
    .imageBucket({
      maxSize: MaxImageSize,
    })
    .input(
      object({
        // /recipe/uploaded-file.jpg
        type: z.enum(["recipe", "profile"]),
      })
    )
    .path(({ ctx, input }) => [{ author: ctx.userId }, { type: input.type }]),
});
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext: createContext,
});

export { handler as GET, handler as POST };

// export const edgeStoreClient = initEdgeStoreClient({
//   router: edgeStoreRouter,
//   baseUrl: "http://localhost:3000/api/edgestore",
// });

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
export type ClientResponse = InferClientResponse<EdgeStoreRouter>;
