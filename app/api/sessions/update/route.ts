import { NextResponse } from 'next/server';
import { sessionApi } from '@/backend';

export async function POST(req: Request) {
  const body = await req.json();
  const { sessionId, correctAnswers, incorrectAnswers } = body as {
    sessionId: string;
    correctAnswers: number;
    incorrectAnswers: number;
  };
  const result = await sessionApi.updateSession(
    sessionId,
    correctAnswers,
    incorrectAnswers
  );
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result);
}
