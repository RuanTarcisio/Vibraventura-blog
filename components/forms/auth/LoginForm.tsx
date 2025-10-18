"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/contexts/AuthStore";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/FieldError";

// 1️⃣ Schema de validação com Zod
export const loginValidationSchema = z.object({
  email: z.string().trim().email("Invalid Email!").nonempty("Email is required!"),
  password: z.string().min(8, "Password must have at least 8 characters!"),
});

// 2️⃣ Tipo inferido do schema
export type LoginFormValues = z.infer<typeof loginValidationSchema>;

// 3️⃣ Props do componente
interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  loading?: boolean;
}

// 4️⃣ Componente
export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
  const auth = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
  });

  const handleSocialLogin = (provider: "google" | "github") => {
    auth.redirectToSocialLogin(provider);
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
            Email:
          </label>
          <Input type="email" placeholder="Email" {...register("email")} />
          <FieldError error={errors.email?.message ?? null} />
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
            Password:
          </label>
          <Input type="password" placeholder="Password" {...register("password")} />
          <FieldError error={errors.password?.message ?? null} />
        </div>

        <Button
          type="submit"
          className="bg-indigo-100 hover:bg-indigo-500 dark:text-white dark:bg-gray-700"
          disabled={loading}
        >
          Login
        </Button>
      </form>

      <div className="relative">
        <div className="relative flex justify-center text-xs uppercase font-bold">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continue com:
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <Button
          variant="outline"
          type="button"
          disabled={loading}
          className="w-full bg-red-700"
          onClick={() => handleSocialLogin("google")}
        >
          <div className="flex items-center justify-center px-6 py-2">
            <FaGoogle className="mr-2 h-4 w-5" />
            <span>Google</span>
          </div>
        </Button>

        <Button
          variant="outline"
          type="button"
          disabled={loading}
          className="w-full bg-gray-600"
          onClick={() => handleSocialLogin("github")}
        >
          <div className="flex items-center justify-center px-6 py-2">
            <FaGithub className="mr-2 h-4 w-5" />
            <span className="text-white">GitHub</span>
          </div>
        </Button>
      </div>
    </div>
  );
};


// interface LoginFormProps {
//   onSubmit: (values: LoginFormValues) => void;
//   loading?: boolean;
// }

// export const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
//   const auth = useAuthStore();  
//   const { values, handleChange, handleSubmit, errors } =
//     useFormik<LoginFormValues>({
//       initialValues: { email: "", password: "" },
//       validationSchema: loginValidationScheme,
//       onSubmit,
//     });

//   // Função para redirecionar para o login com Google
//   const handleGoogleLogin = () => {
//     auth.redirectToSocialLogin("google");
//   };

//   // Função para redirecionar para o login com GitHub
//   const handleGitHubLogin = () => {
//     auth.redirectToSocialLogin("github");
//   };

//   return (
//     <div className="grid gap-6">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
//             Email:{" "}
//           </label>
//           <InputText
//             style="w-full dark:bg-gray-700"
//             id="email"
//             value={values.email}
//             onChange={handleChange}
//           />
//           <FieldError error={errors.email} />
//         </div>

//         <div>
//           <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
//             Password:{" "}
//           </label>
//           <InputText
//             style="w-full dark:bg-gray-700"
//             type="password"
//             id="password"
//             value={values.password}
//             onChange={handleChange}
//           />
//           <FieldError error={errors.password} />
//         </div>

//         <Button
//           type="submit"
//           className="bg-indigo-100 hover:bg-indigo-500 dark:text-white dark:bg-gray-700"
//           label={loading ? "Logging in..." : "Confirmar"}
//           disabled={loading}
//         />
//       </form>

//       <div className="relative">
//         <div className="relative flex justify-center text-xs uppercase font-bold">
//           <span className="bg-background px-2 text-muted-foreground ">
//             Ou continue com:
//           </span>
//         </div>
//       </div>

//       <div className="flex flex-col gap-y-2">
//         <Button
//           variant="outline"
//           type="button"
//           disabled={loading}
//           className="w-full bg-red-700"
//           onClick={handleGoogleLogin}
//         >
//           <div className="flex items-center justify-center px-6 py-2">
//             <FaGoogle className="mr-2 h-4 w-5" /> {/* Ícone do Google */}
//             <span>Google</span>
//           </div>
//         </Button>

//         <Button
//          variant="outline"
//           type="button"
//           disabled={loading}
//           className="w-full bg-gray-600"
//           onClick={handleGitHubLogin}
//         >
//           <div className="flex items-center justify-center px-6 py-2">
//             <FaGithub className="mr-2 h-4 w-5" /> {/* Ícone do GitHub */}
//             <span className="text-white">GitHub</span>
//           </div>
//         </Button>
//       </div>
//     </div>
//   );
// };
