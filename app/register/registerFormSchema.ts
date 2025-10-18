import { z } from "zod";

const getMaxBirthDate = () => {
  const currentDate = new Date();
  return new Date(
    currentDate.getFullYear() - 6,
    currentDate.getMonth(),
    currentDate.getDate()
  );
};

export const registerFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid e-mail format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  passwordMatch: z.string().min(1, { message: "Confirm password is required" }),
  birthdate: z
    .date()
    .refine((date) => date instanceof Date, { message: "Please select a valid date" })
    .refine((date) => date <= new Date(), { message: "Date cannot be in the future" })
    .refine((date) => date <= getMaxBirthDate(), { message: "Minimum age is 6 years old" }),
  cpf: z.string()
    .min(11, { message: "CPF must contain exactly 11 digits" })
    .max(11, { message: "CPF must contain exactly 11 digits" }),
  profileImage: z
    .instanceof(File)
    .optional()
    .refine(file => !file || file.size <= 5 * 1024 * 1024, { message: "File too large (max 5MB)" })
    .refine(file => !file || ['image/jpeg', 'image/png', 'image/gif'].includes(file.type), { message: "Unsupported file format" })
}).refine(data => data.password === data.passwordMatch, {
  message: "Passwords do not match",
  path: ["passwordMatch"],
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
