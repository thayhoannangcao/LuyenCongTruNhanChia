import { NextResponse } from 'next/server';
import { sessionApi } from '@/backend';

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, config } = body as { userId: string; config: any };
  const result = await sessionApi.createSession(userId, config);
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result);
}
