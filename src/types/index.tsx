import { z } from "zod";

export type InputFields = {
  name: "username" | "email" | "password" | "repeatPassword";
  id: string;
  label: string;
  type: string;
};

export const inputSchema = z
  .object({
    username: z.string().min(4, "Username is too short").optional(),
    email: z.string().email(),
    password: z.string().min(5, "Password must be at least 5 characters"),
    repeatPassword: z
      .string()
      .min(5, "Password must be at least 5 characters")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.repeatPassword) {
      if (data.password === data.repeatPassword) {
        return true;
      } else {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords must match",
          path: ["repeatPassword"],
        });
      }
    }

    return true;
  });

export type FormInputs = z.infer<typeof inputSchema>;
