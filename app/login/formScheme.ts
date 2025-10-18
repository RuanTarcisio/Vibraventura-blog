import { z } from "zod";

// Define os campos e validações
export const loginValidationSchema = z.object({
  email: z.string().trim().email("Invalid Email!").nonempty("Email is required!"),
  password: z.string().min(8, "Password must have at least 8 characters!"),
});

// Tipo inferido automaticamente pelo Zod
export type LoginFormValues = z.infer<typeof loginValidationSchema>;