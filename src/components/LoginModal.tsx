'use client';

import { useRouter } from 'next/navigation';
import { Heart, LogIn, UserPlus, X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  characterName?: string;
}

export function LoginModal({ isOpen, onClose, characterName }: LoginModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-slide-up">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <Heart size={32} className="text-red-400" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
          ¡Inicia sesión para guardar favoritos!
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          {characterName
            ? `Para agregar a "${characterName}" a tus favoritos, necesitas tener una cuenta.`
            : 'Para guardar personajes favoritos, necesitas iniciar sesión.'}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              onClose();
              router.push('/login');
            }}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Iniciar sesión
          </button>
          <button
            onClick={() => {
              onClose();
              router.push('/register');
            }}
            className="btn btn-secondary w-full flex items-center justify-center gap-2"
          >
            <UserPlus size={18} />
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
