import { z } from 'zod'

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
 
export const LoginSchema = z.object({ 
  email: z.string().email(), 
  password: z.string().min(6) 
})

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 1MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .trim(),
})

export const UpdateDataFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters long.' })
    .trim(),
  bio: z
    .string()
    .min(3, { message: 'Bio must be at least 3 characters long' })
    .trim(),
})

export const SendResetEmailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
})

export const ResetPasswordFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .trim(),
  confirm_password: z
    .string()
    .trim()
}).refine((values) => values.password === values.confirm_password, {
    message: "Passwords must match!",
    path: ["confirm_password"],
  }
)

