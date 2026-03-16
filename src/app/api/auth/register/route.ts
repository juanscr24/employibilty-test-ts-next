import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import getDb from '@/../../database/database';
import { signToken } from '@/libs/jwt';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, documentTypeId, documentNumber } =
      await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Nombre, email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    const db = getDb();

    const existing = db
      .prepare('SELECT id FROM users WHERE email = ?')
      .get(email);

    if (existing) {
      return NextResponse.json(
        { message: 'El email ya está registrado' },
        { status: 409 }
      );
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const result = db
      .prepare(
        `INSERT INTO users (name, email, password_hash, role_id, document_type_id, document_number)
         VALUES (?, ?, ?, 2, ?, ?)`
      )
      .run(
        name,
        email,
        passwordHash,
        documentTypeId ?? null,
        documentNumber ?? null
      );

    const newUser = db
      .prepare(
        `SELECT u.*, r.name as role_name, dt.abbreviation as doc_type_abbr, dt.name as doc_type_name
         FROM users u
         JOIN roles r ON u.role_id = r.id
         LEFT JOIN document_types dt ON u.document_type_id = dt.id
         WHERE u.id = ?`
      )
      .get(result.lastInsertRowid) as any;

    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role_name,
    });

    return NextResponse.json(
      {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role_name,
          documentTypeId: newUser.document_type_id,
          documentTypeAbbr: newUser.doc_type_abbr,
          documentTypeName: newUser.doc_type_name,
          documentNumber: newUser.document_number,
          createdAt: newUser.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
