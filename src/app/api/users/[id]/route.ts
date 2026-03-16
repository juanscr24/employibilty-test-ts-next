import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/../../database/database';
import { getAuthPayload } from '@/libs/jwt';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const payload = getAuthPayload(req);

  if (!payload) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }

  if (payload.role !== 'admin') {
    return NextResponse.json({ message: 'Acceso denegado' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const userId = parseInt(id, 10);
    const { name, email, roleId, documentTypeId, documentNumber } =
      await req.json();

    const db = getDb();

    const existing = db
      .prepare('SELECT id FROM users WHERE id = ?')
      .get(userId);

    if (!existing) {
      return NextResponse.json(
        { message: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Check email uniqueness (excluding current user)
    if (email) {
      const emailConflict = db
        .prepare('SELECT id FROM users WHERE email = ? AND id != ?')
        .get(email, userId);
      if (emailConflict) {
        return NextResponse.json(
          { message: 'El email ya está en uso por otro usuario' },
          { status: 409 }
        );
      }
    }

    db.prepare(
      `UPDATE users
       SET name = COALESCE(?, name),
           email = COALESCE(?, email),
           role_id = COALESCE(?, role_id),
           document_type_id = ?,
           document_number = ?,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).run(
      name ?? null,
      email ?? null,
      roleId ?? null,
      documentTypeId ?? null,
      documentNumber ?? null,
      userId
    );

    const updated = db
      .prepare(
        `SELECT u.id, u.name, u.email, u.document_number, u.created_at, u.updated_at,
                r.name AS role, dt.name AS document_type_name, dt.abbreviation AS document_type_abbr
         FROM users u
         JOIN roles r ON u.role_id = r.id
         LEFT JOIN document_types dt ON u.document_type_id = dt.id
         WHERE u.id = ?`
      )
      .get(userId);

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const payload = getAuthPayload(req);

  if (!payload) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }

  if (payload.role !== 'admin') {
    return NextResponse.json({ message: 'Acceso denegado' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const userId = parseInt(id, 10);

    if (userId === payload.userId) {
      return NextResponse.json(
        { message: 'No puedes eliminar tu propia cuenta' },
        { status: 400 }
      );
    }

    const db = getDb();
    const existing = db
      .prepare('SELECT id FROM users WHERE id = ?')
      .get(userId);

    if (!existing) {
      return NextResponse.json(
        { message: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    db.prepare('DELETE FROM users WHERE id = ?').run(userId);

    return NextResponse.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
