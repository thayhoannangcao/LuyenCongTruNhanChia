import { NextResponse } from 'next/server';
import { authApi } from '@/backend';

export async function POST() {
  const result = await authApi.signOut();
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result);
}
