import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email cannot be blank."),
  password: z.string().min(1, "Password cannot be blank"),
});

export type LoginType = z.infer<typeof loginSchema>;
