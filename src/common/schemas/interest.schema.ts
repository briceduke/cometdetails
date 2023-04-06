import validator from "validator";
import { z } from "zod";

export const interestSchema = z.object({
  name: z.string().max(30, "30 or less characters"),
  email: z.string().trim().email().or(z.string().length(0)).optional(),
  phone: z
    .string()
    .trim()
    .refine(validator.isMobilePhone, "Invalid phone")
    .or(z.string().length(0))
    .optional(),
  lastName: z.string().length(0),
});
export type interestInput = ReturnType<typeof interestSchema.parse>;
