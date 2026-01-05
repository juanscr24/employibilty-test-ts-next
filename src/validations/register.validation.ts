import { z } from 'zod';

/**
 * Esquema de validación para registro
 */
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'El nombre es obligatorio')
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(50, 'El nombre no puede exceder 50 caracteres'),
    email: z
      .string()
      .min(1, 'El email es obligatorio')
      .email('Ingresa un email válido'),
    password: z
      .string()
      .min(1, 'La contraseña es obligatoria')
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(100, 'La contraseña no puede exceder 100 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
      ),
    confirmPassword: z
      .string()
      .min(1, 'Debes confirmar la contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
