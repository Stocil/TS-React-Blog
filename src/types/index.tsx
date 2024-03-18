import { z } from "zod";

export type User = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};
export type PartialUser = Partial<User>;

export type InputFields = {
  name: "username" | "email" | "password" | "repeatPassword";
  id: string;
  label: string;
  type: string;
};

export const inputSchema = z
  .object({
    username: z.string().min(4, "Username is too short"),
    email: z.string().email().optional(),
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
