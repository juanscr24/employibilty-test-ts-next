'use client';

import Link from 'next/link';
import { LogOut, Shield, LogIn } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DashboardHeader({
  title,
  subtitle,
}: DashboardHeaderProps) {
  const { user, isAuthenticated, logout } = useAuthContext();

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{title}</h1>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {isAuthenticated && user ? (
          <>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>

            {user.role === 'admin' && (
              <Link
                href="/admin"
                className="btn btn-secondary flex items-center gap-2 text-sm py-2!"
              >
                <Shield size={16} />
                Admin
              </Link>
            )}

            <button
              onClick={logout}
              className="btn btn-danger flex items-center gap-2 text-sm py-2!"
              title="Cerrar sesión"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="btn btn-primary flex items-center gap-2 text-sm py-2!"
          >
            <LogIn size={16} />
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}
