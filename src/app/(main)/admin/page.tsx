'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { apiClient } from '@/libs/axios';
import { AdminUser, DocumentType } from '@/types';
import DashboardHeader from '@/components/DashboardHeader';
import { LoadingSpinner } from '@/components/Loading';
import { ToastContainer } from '@/components/Toast';
import { useToast } from '@/hooks';
import { Pencil, Trash2, X, Save } from 'lucide-react';

interface EditForm {
  name: string;
  email: string;
  roleId: number;
  documentTypeId: number | null;
  documentNumber: string;
}

export default function AdminPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuthContext();
  const router = useRouter();
  const { toasts, showToast, hideToast } = useToast();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({
    name: '',
    email: '',
    roleId: 2,
    documentTypeId: null,
    documentNumber: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Auth guard
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (user?.role !== 'admin') {
        router.replace('/dashboard');
      }
    }
  }, [authLoading, isAuthenticated, user, router]);

  // Load data
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') return;

    Promise.all([
      apiClient.get<AdminUser[]>('/users'),
      apiClient.get<DocumentType[]>('/document-types'),
    ])
      .then(([usersRes, dtRes]) => {
        setUsers(usersRes.data);
        setDocumentTypes(dtRes.data);
      })
      .catch(() => showToast('Error al cargar datos', 'error'))
      .finally(() => setIsLoading(false));
  }, [isAuthenticated, user]);

  const openEdit = (u: AdminUser) => {
    setEditingUser(u);
    setEditForm({
      name: u.name,
      email: u.email,
      roleId: u.role === 'admin' ? 1 : 2,
      documentTypeId: u.document_type_id,
      documentNumber: u.document_number ?? '',
    });
  };

  const saveEdit = async () => {
    if (!editingUser) return;
    try {
      setIsSaving(true);
      const res = await apiClient.put<AdminUser>(`/users/${editingUser.id}`, {
        name: editForm.name,
        email: editForm.email,
        roleId: editForm.roleId,
        documentTypeId: editForm.documentTypeId,
        documentNumber: editForm.documentNumber || null,
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? res.data : u))
      );
      setEditingUser(null);
      showToast('Usuario actualizado correctamente', 'success');
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || 'Error al actualizar usuario',
        'error'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const deleteUser = async (userId: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;
    try {
      setDeletingId(userId);
      await apiClient.delete(`/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      showToast('Usuario eliminado correctamente', 'success');
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || 'Error al eliminar usuario',
        'error'
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" className="text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex justify-center">
      <ToastContainer toasts={toasts} onClose={hideToast} />

      <div className="w-9/10 max-lg:w-full max-lg:px-4 py-8 flex flex-col gap-6">
        <DashboardHeader
          title="Panel de Administración"
          subtitle="Gestiona los usuarios registrados"
        />

        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" className="text-blue-600" />
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">
                      ID
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">
                      Nombre
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">
                      Email
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">
                      Rol
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">
                      Documento
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">
                      Registrado
                    </th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-500">{u.id}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {u.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{u.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`badge ${
                            u.role === 'admin'
                              ? 'badge-info'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {u.document_type_abbr && u.document_number
                          ? `${u.document_type_abbr}: ${u.document_number}`
                          : '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(u.created_at).toLocaleDateString('es-CO')}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEdit(u)}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Editar"
                          >
                            <Pencil size={16} />
                          </button>
                          {u.id !== user?.id && (
                            <button
                              onClick={() => deleteUser(u.id)}
                              disabled={deletingId === u.id}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                              title="Eliminar"
                            >
                              {deletingId === u.id ? (
                                <LoadingSpinner size="sm" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-10 text-gray-400"
                      >
                        No hay usuarios registrados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setEditingUser(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slide-up">
            <button
              onClick={() => setEditingUser(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Editar usuario
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  className="input w-full"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="input w-full"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, email: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol
                </label>
                <select
                  className="input w-full"
                  value={editForm.roleId}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      roleId: parseInt(e.target.value, 10),
                    }))
                  }
                >
                  <option value={2}>user</option>
                  <option value={1}>admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de documento
                </label>
                <select
                  className="input w-full"
                  value={editForm.documentTypeId ?? ''}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      documentTypeId: e.target.value
                        ? parseInt(e.target.value, 10)
                        : null,
                    }))
                  }
                >
                  <option value="">Sin tipo</option>
                  {documentTypes.map((dt) => (
                    <option key={dt.id} value={dt.id}>
                      {dt.abbreviation} — {dt.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de documento
                </label>
                <input
                  type="text"
                  className="input w-full"
                  value={editForm.documentNumber}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      documentNumber: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setEditingUser(null)}
                  className="btn btn-secondary flex-1"
                  disabled={isSaving}
                >
                  Cancelar
                </button>
                <button
                  onClick={saveEdit}
                  disabled={isSaving}
                  className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      <Save size={16} />
                      Guardar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
