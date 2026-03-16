import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import getDb from '@/../../database/database';
import { signToken } from '@/libs/jwt';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    const db = getDb();
    const user = db
      .prepare(
        `SELECT u.*, r.name as role_name, dt.abbreviation as doc_type_abbr, dt.name as doc_type_name
         FROM users u
         JOIN roles r ON u.role_id = r.id
         LEFT JOIN document_types dt ON u.document_type_id = dt.id
         WHERE u.email = ?`
      )
      .get(email) as any;

    if (!user) {
      return NextResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const isValidPassword = bcrypt.compareSync(password, user.password_hash);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role_name,
    });

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role_name,
        documentTypeId: user.document_type_id,
        documentTypeAbbr: user.doc_type_abbr,
        documentTypeName: user.doc_type_name,
        documentNumber: user.document_number,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
