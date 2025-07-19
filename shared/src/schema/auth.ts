import { z } from "zod";

export const AuthSchema = z.object({
  name: z
    .string()
    .min(3, "Name not long enough")
    .max(12, "Name maximum exceeded"),
  email: z.email("Is not an email"),
  password: z
    .string()
    .min(8, "Password not long enough")
    .max(32, "Password maximum exceeded"),
  confirmPassword: z.string(),
});

export const SignupSchema = AuthSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    path: ["confirmPassword"],
    error: "Password do not match",
  },
);

export const SigninSchema = AuthSchema.pick({
  email: true,
  password: true,
});

export type SigninSchemaType = z.infer<typeof SigninSchema>;
export type SignupSchemaType = z.infer<typeof SignupSchema>;
