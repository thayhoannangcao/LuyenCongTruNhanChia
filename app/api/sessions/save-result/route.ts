import { NextResponse } from 'next/server';
import { sessionApi } from '@/backend';

export async function POST(req: Request) {
  const body = await req.json();
  const {
    sessionId,
    question,
    userAnswer,
    correctAnswer,
    isCorrect,
    timeTaken,
  } = body as any;
  const result = await sessionApi.saveResult(
    sessionId,
    question,
    userAnswer,
    correctAnswer,
    isCorrect,
    timeTaken
  );
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result);
}
