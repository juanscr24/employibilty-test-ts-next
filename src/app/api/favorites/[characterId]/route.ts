import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/../../database/database';
import { getAuthPayload } from '@/libs/jwt';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ characterId: string }> }
) {
  const payload = getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }

  try {
    const { characterId } = await params;
    const db = getDb();

    db.prepare(
      'DELETE FROM favorites WHERE user_id = ? AND character_id = ?'
    ).run(payload.userId, parseInt(characterId, 10));

    return NextResponse.json({ message: 'Eliminado de favoritos' });
  } catch (error) {
    console.error('Delete favorite error:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
