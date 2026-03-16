import { NextResponse } from 'next/server';
import getDb from '@/../../database/database';

export async function GET() {
  try {
    const db = getDb();
    const types = db
      .prepare('SELECT id, name, abbreviation FROM document_types ORDER BY id')
      .all();
    return NextResponse.json(types);
  } catch (error) {
    console.error('Document types error:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
