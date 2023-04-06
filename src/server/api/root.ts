import { createTRPCRouter } from "@/server/api/trpc";

import { interestRouter } from "./routers/interest";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  interest: interestRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
