import { NextResponse } from 'next/server';
import { authApi } from '@/backend';

export async function POST(req: Request) {
  const body = (await req.json()) as { username: string; password: string };
  const result = await authApi.signIn(body);
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result);
}
