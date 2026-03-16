import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/../../database/database';
import { getAuthPayload } from '@/libs/jwt';

export async function GET(req: NextRequest) {
  const payload = getAuthPayload(req);

  if (!payload) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }

  if (payload.role !== 'admin') {
    return NextResponse.json({ message: 'Acceso denegado' }, { status: 403 });
  }

  try {
    const db = getDb();
    const users = db
      .prepare(
        `SELECT
           u.id,
           u.name,
           u.email,
           u.document_number,
           u.created_at,
           u.updated_at,
           r.name  AS role,
           dt.name AS document_type_name,
           dt.abbreviation AS document_type_abbr,
           dt.id   AS document_type_id
         FROM users u
         JOIN roles r ON u.role_id = r.id
         LEFT JOIN document_types dt ON u.document_type_id = dt.id
         ORDER BY u.created_at DESC`
      )
      .all();

    return NextResponse.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
