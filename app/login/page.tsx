"use client";

import { useEffect, useState } from "react";
import { LoginForm } from "../../components/forms"; 
import { useAuthStore } from "../../contexts/AuthStore"; 
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner"; 
// import RouteGuard from "@/components/RouteGuard";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuthStore();

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push(redirect);
  //   }
  // }, [isAuthenticated, router, redirect]);

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      router.push(redirect);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro no login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white text-gray-900 min-h-[80vh]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Entre na sua conta
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm onSubmit={handleLogin} loading={loading} />
      </div>
    </div>
  );
};

export default LoginPage;
