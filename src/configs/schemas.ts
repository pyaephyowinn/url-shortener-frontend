import { z } from "zod";

const isValidUrlPart = (value: string) => {
  // Regex to allow alphanumeric characters, hyphens, and underscores
  return /^[a-zA-Z0-9_-]+$/.test(value);
};

export const loginSchema = z.object({
  email: z.string().min(1, "Email cannot be blank."),
  password: z.string().min(1, "Password cannot be blank"),
});

export type LoginType = z.infer<typeof loginSchema>;

export const urlSchema = z.object({
  originalUrl: z
    .string()
    .min(1, "Original URL cannot be blank.")
    .url("Invalid URL format for original URL."),
  shortUrl: z
    .string()
    .min(1, "Short URL cannot be blank.")
    .refine((value) => isValidUrlPart(value), {
      message:
        "Short URL must be a valid URL part (alphanumeric, hyphens, or underscores).",
    }),
});

export type UrlType = z.infer<typeof urlSchema>;
export type UrlDetailType = UrlType & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
