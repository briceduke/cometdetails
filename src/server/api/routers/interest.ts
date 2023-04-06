import { interestSchema } from "@/common/schemas/interest.schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const interestRouter = createTRPCRouter({
  interest: publicProcedure
    .input(interestSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, email, phone } = input;
      const { prisma } = ctx;

      const noEmail = !email || email.length == 0;
      const noPhone = !phone || phone.length == 0;

      if (noEmail && noPhone)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You must provide a phone number and/or an email!",
        });

      try {
        const interest = await prisma.interest.create({
          data: {
            email,
            name,
            phone,
          },
        });

        return interest;
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "You've already signed up!",
            });
          }
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Oopsie, something went wrong. :( Try again.",
        });
      }
    }),
});
