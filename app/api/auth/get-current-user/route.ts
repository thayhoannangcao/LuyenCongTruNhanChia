import { NextResponse } from 'next/server';
import { authApi } from '@/backend';

export async function GET() {
  const result = await authApi.getCurrentUser();
  // getCurrentUser always returns success with user or null
  return NextResponse.json({ user: (result as any).user ?? null });
}
