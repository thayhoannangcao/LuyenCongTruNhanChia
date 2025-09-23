import { NextResponse } from 'next/server';
import { authApi } from '@/backend';

export async function POST(req: Request) {
  const body = await req.json();
  const result = await authApi.changePassword(body);
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result);
}
