import { z } from "zod";

export type InputFields = {
  name: "username" | "email" | "password" | "repeatPassword" | "image";
  id: string;
  label: string;
  type: string;
};

export type UpdateInputFields = {
  name: "username" | "email" | "password" | "image";
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
    image: z.string().optional(),
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

export const updateInputSchema = z.object({
  username: z.string().min(4, "New username is too short"),
  email: z.string().email(),
  password: z
    .union([
      z.string().length(0, "New password must be at least 5 characters"),
      z.string().min(5),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  image: z
    .string()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

export type UpdateFormInputs = z.infer<typeof updateInputSchema>;
