'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { registerSchema, RegisterFormData } from '@/validations';
import { useAuth } from '@/hooks';
import { FormField } from '@/components/FormField';
import { LoadingSpinner } from '@/components/Loading';
import { ToastContainer } from '@/components/Toast';
import { useToast } from '@/hooks';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuth();
  const { toasts, showToast, hideToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsSubmitting(true);
      
      // Simulación de registro - ajustar según tu backend
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      showToast('¡Registro exitoso! Redirigiendo...', 'success');
      
      // Redirigir al login o dashboard
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } catch (error: any) {
      showToast(
        error.message || 'Error al registrarse. Intenta nuevamente.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onClose={hideToast} />
      
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card max-sm:bg-transparent! max-sm:shadow-none! max-sm:border-none! animate-slide-up p-4!"
          >
            <div className="card-body space-y-6 flex! flex-col! gap-2!">
              {/* Header */}
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Crear cuenta
                </h1>
                <p className="text-gray-600">
                  Completa el formulario para registrarte
                </p>
              </div>

              {/* Name Field */}
              <FormField
                label="Nombre completo"
                error={errors.name?.message}
                required
              >
                <input
                  type="text"
                  placeholder="Juan Pérez"
                  className={`input ${errors.name ? 'input-error' : ''}`}
                  {...register('name')}
                  disabled={isSubmitting}
                />
              </FormField>

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
                <p className="text-xs text-gray-500 mt-1">
                  Mínimo 6 caracteres, incluye mayúscula, minúscula y número
                </p>
              </FormField>

              {/* Confirm Password Field */}
              <FormField
                label="Confirmar contraseña"
                error={errors.confirmPassword?.message}
                required
              >
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`input ${errors.confirmPassword ? 'input-error' : ''}`}
                  {...register('confirmPassword')}
                  disabled={isSubmitting}
                />
              </FormField>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full mt-2!"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Registrando...
                  </>
                ) : (
                  'Registrarse'
                )}
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
