import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/../../database/database';
import { getAuthPayload } from '@/libs/jwt';

export async function GET(req: NextRequest) {
  const payload = getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }

  try {
    const db = getDb();
    const favorites = db
      .prepare(
        'SELECT character_id FROM favorites WHERE user_id = ? ORDER BY created_at DESC'
      )
      .all(payload.userId);

    return NextResponse.json(favorites);
  } catch (error) {
    console.error('Get favorites error:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const payload = getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }

  try {
    const { characterId } = await req.json();

    if (!characterId) {
      return NextResponse.json(
        { message: 'characterId es requerido' },
        { status: 400 }
      );
    }

    const db = getDb();
    db.prepare(
      'INSERT OR IGNORE INTO favorites (user_id, character_id) VALUES (?, ?)'
    ).run(payload.userId, characterId);

    return NextResponse.json(
      { message: 'Agregado a favoritos' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Add favorite error:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
