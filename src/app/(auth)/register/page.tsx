'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { registerSchema, RegisterFormData } from '@/validations';
import { useAuth } from '@/hooks';
import { FormField } from '@/components/FormField';
import { LoadingSpinner } from '@/components/Loading';
import { ToastContainer } from '@/components/Toast';
import { useToast } from '@/hooks';
import { DocumentType } from '@/types';
import { apiClient } from '@/libs/axios';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register: authRegister } = useAuth();
  const { toasts, showToast, hideToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);

  useEffect(() => {
    apiClient
      .get<DocumentType[]>('/document-types')
      .then((res) => setDocumentTypes(res.data))
      .catch(() => {});
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsSubmitting(true);
      await authRegister({
        name: data.name,
        email: data.email,
        password: data.password,
        documentTypeId: data.documentTypeId,
        documentNumber: data.documentNumber,
      });
      showToast('¡Registro exitoso! Redirigiendo...', 'success');
      setTimeout(() => router.push('/dashboard'), 800);
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || 'Error al registrarse. Intenta nuevamente.',
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

              {/* Document Type Field */}
              <FormField
                label="Tipo de documento"
                error={errors.documentTypeId?.message}
                required
              >
                <select
                  className={`input ${errors.documentTypeId ? 'input-error' : ''}`}
                  disabled={isSubmitting}
                  defaultValue=""
                  onChange={(e) => {
                    const val = e.target.value;
                    setValue('documentTypeId', val ? parseInt(val, 10) : (undefined as any));
                  }}
                >
                  <option value="" disabled>
                    Selecciona un tipo
                  </option>
                  {documentTypes.map((dt) => (
                    <option key={dt.id} value={dt.id}>
                      {dt.abbreviation} — {dt.name}
                    </option>
                  ))}
                </select>
              </FormField>

              {/* Document Number Field */}
              <FormField
                label="Número de documento"
                error={errors.documentNumber?.message}
                required
              >
                <input
                  type="text"
                  placeholder="1234567890"
                  className={`input ${errors.documentNumber ? 'input-error' : ''}`}
                  {...register('documentNumber')}
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
