'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/Loading';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirigir automáticamente al dashboard
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Rick & Morty App
        </h1>
        <p className="text-gray-600 mb-8">Cargando aplicación...</p>
        <LoadingSpinner size="lg" className="text-blue-600" />
      </div>
    </div>
  );
}
