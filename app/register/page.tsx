"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner"; // ou react-toastify
import { format } from "date-fns";
import { RegisterForm } from "../../components/forms";
import { useAuthStore } from "../../contexts/AuthStore";
import { RegisterFormValues } from "./registerFormSchema";

export default function RegisterPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const router = useRouter();
  const { theme, systemTheme } = useTheme();

  useEffect(() => setIsMounted(true), []);

  const handleRegister = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("cpf", values.cpf);

      if (values.birthdate) {
        const formatted = format(values.birthdate, "dd/MM/yyyy");
        formData.append("birthdate", formatted);
      }

      if (values.profileImage) {
        formData.append("profileImage", values.profileImage);
      }

      await register(formData);
      toast.success("Cadastro realizado com sucesso!");

      setTimeout(() => router.push("/login"), 1000);
    } catch (error: unknown) {
      console.error("Erro completo no registro:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao registrar. Verifique os dados.");
      }
    } finally {
      setLoading(false);
    }
  };

  const currentTheme = isMounted ? (theme === "system" ? systemTheme : theme) : "light";
  if (!isMounted) return null;

  return (

    <div className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 
        ${currentTheme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">
          Create New User
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <RegisterForm
          onSubmit={handleRegister}
          onCancel={() => router.push("/login")}
        // loading={loading}
        />
      </div>
    </div>

  );
}
