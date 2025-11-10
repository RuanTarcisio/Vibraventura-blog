"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/contexts/AuthStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const checkSession = useAuthStore((s) => s.checkSession);

    useEffect(() => {
        checkSession(); // ✅ Roda só 1x no app load
    }, [checkSession]);

    return <>{children}</>;
}