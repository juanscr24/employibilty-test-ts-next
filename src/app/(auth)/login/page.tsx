'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginSchema, LoginFormData } from '@/validations';
import { useAuth } from '@/hooks';
import { FormField } from '@/components/FormField';
import { LoadingSpinner } from '@/components/Loading';
import { ToastContainer } from '@/components/Toast';
import { useToast } from '@/hooks';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const { toasts, showToast, hideToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      
      // Simulación de login - ajustar según tu backend
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      showToast('¡Inicio de sesión exitoso!', 'success');
      
      // Redirigir al dashboard
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error: any) {
      showToast(
        error.message || 'Error al iniciar sesión. Verifica tus credenciales.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onClose={hideToast} />
      
      <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card animate-slide-up"
          >
            <div className="card-body space-y-6">
              {/* Header */}
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Iniciar sesión
                </h1>
                <p className="text-gray-600">
                  Ingresa tus credenciales para continuar
                </p>
              </div>

              {/* Email Field */}
              <FormField
                label="Correo electrónico"
                error={errors.email?.message}
                required
              >
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className={`input ${errors.email ? 'input-error' : ''}`}
                  {...register('email')}
                  disabled={isSubmitting}
                />
              </FormField>

              {/* Password Field */}
              <FormField
                label="Contraseña"
                error={errors.password?.message}
                required
              >
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`input ${errors.password ? 'input-error' : ''}`}
                  {...register('password')}
                  disabled={isSubmitting}
                />
              </FormField>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Ingresar'
                )}
              </button>

              {/* Register Link */}
              <p className="text-center text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <Link
                  href="/register"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
