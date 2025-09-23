// keeps existing import below
import { NextResponse } from 'next/server';
import { userApi } from '@/backend';

// NOTE: Các route này dựa vào RLS + service role. Triển khai đơn giản.

export async function GET() {
  const result = await userApi.getUsers();
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ users: result.users });
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = await userApi.createUser(body);
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ user: result.user });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const result = await userApi.updateUser(body);
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ user: result.user });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const result = await userApi.deleteUser(id);
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ success: true });
}
