'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '../../contexts/AuthStore'; 
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '../../components/LoadingScreen'; 
import { IoShieldCheckmark, IoAlertCircle } from "react-icons/io5";
import Link from 'next/link';

export default function OAuthCallbackPage() {
  const { checkSession } = useAuthStore();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    let mounted = true;

    const verify = async () => {
      // delay pequeno para permitir que cookie social seja setado
      await new Promise(r => setTimeout(r, 500));

      const valid = await checkSession(true);
      if (!mounted) return;

      setStatus(valid ? 'success' : 'error');

      const redirectUrl = valid ? '/' : '/login';
      setTimeout(() => router.push(redirectUrl), 2000);
    };

    verify();

    return () => { mounted = false; };
  }, [checkSession, router]);

  if (status === 'loading') return <LoadingScreen />;

  return (
    <div className='flex h-screen w-full justify-center items-center flex-col gap-8'>
      {status === 'error' && (
        <>
          <IoAlertCircle className='text-9xl text-red-500' />
          <h2 className='text-4xl font-bold'>Autenticação Falhou</h2>
          <p className='text-lg'>Falha ao verificar autenticação.</p>
          <Link href="/login" className='mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg'>
            Voltar ao Login
          </Link>
        </>
      )}
      {status === 'success' && (
        <>
          <IoShieldCheckmark className='text-9xl text-green-500' />
          <h2 className='text-4xl font-bold'>Bem-vindo de volta!</h2>
          <p className='text-lg'>Redirecionando...</p>
          <Link href="/" className='mt-4 px-6 py-2 bg-green-500 text-white rounded-lg'>
            Ir agora
          </Link>
        </>
      )}
    </div>
  );
}
