import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { USERNAME_EMAIL_SUFFIX } from '@/lib/constants'

// NOTE: Các route này dựa vào RLS + service role. Triển khai đơn giản.

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('id, username, full_name, role, created_at')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ users: data })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { username, full_name, password, role } = body as { username: string; full_name: string; password: string; role?: 'admin'|'user' }
  if (!username || !full_name || !password) {
    return NextResponse.json({ error: 'Thiếu dữ liệu bắt buộc' }, { status: 400 })
  }
  // Tạo auth user bằng service role
  const email = `${username}${USERNAME_EMAIL_SUFFIX}`
  const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { username, full_name },
  })
  if (createErr || !created.user) {
    return NextResponse.json({ error: createErr?.message || 'Không tạo được user auth' }, { status: 400 })
  }
  const { data, error } = await supabaseAdmin
    .from('users')
    .insert({ id: created.user.id, username, full_name, role: role || 'user' })
    .select('id, username, full_name, role, created_at')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ user: data })
}

export async function PATCH(req: Request) {
  const body = await req.json()
  const { id, username, full_name, role } = body
  const { data, error } = await supabaseAdmin
    .from('users')
    .update({ username, full_name, role })
    .eq('id', id)
    .select('id, username, full_name, role, created_at')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ user: data })
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const { error } = await supabaseAdmin
    .from('users')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // Xóa luôn auth user để tránh đăng nhập được nhưng thiếu profile
  const { error: authErr } = await supabaseAdmin.auth.admin.deleteUser(id)
  if (authErr) return NextResponse.json({ error: authErr.message }, { status: 400 })

  return NextResponse.json({ success: true })
}


