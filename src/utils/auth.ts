import { supabase } from '@/lib/supabase';
import { USERNAME_EMAIL_SUFFIX } from '@/src/constants/base.constants';
import { supabaseLite } from '@/lib/supabase-lite';
import type { ChangePasswordPayload } from '@/src/types/types';
import { withTimeout } from '@/src/utils/utils';

export interface AuthUser {
  id: string;
  username: string;
  full_name: string;
  role?: 'admin' | 'user';
}

export interface SignUpData {
  username: string;
  full_name: string;
  password: string;
}

export interface SignInData {
  username: string;
  password: string;
}

export async function signUp(data: SignUpData) {
  try {
    const fakeEmail = `${data.username}${USERNAME_EMAIL_SUFFIX}`;

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: fakeEmail,
      password: data.password,
      options: {
        data: {
          username: data.username,
          full_name: data.full_name,
        },
      },
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        throw new Error('Tài khoản này đã tồn tại');
      }
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error('Không thể tạo tài khoản');
    }

    const { error: profileError } = await supabase.from('users').insert({
      id: authData.user.id,
      username: data.username,
      full_name: data.full_name,
    });

    if (profileError) {
      throw new Error(profileError.message);
    }

    return { success: true, user: authData.user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Có lỗi xảy ra',
    };
  }
}

export async function signIn(data: SignInData) {
  try {
    const fakeEmail = `${data.username}${USERNAME_EMAIL_SUFFIX}`;

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: fakeEmail,
      password: data.password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Tài khoản hoặc mật khẩu không đúng');
      }
      throw new Error(error.message);
    }

    if (!authData.user) {
      throw new Error('Đăng nhập thất bại');
    }

    const clientId = getOrCreateClientId();
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .update({ current_client_id: clientId })
      .eq('id', authData.user.id)
      .select('id, username, full_name, role, current_client_id')
      .single();

    if (profileError) {
      throw new Error(profileError.message);
    }

    return {
      success: true,
      user: {
        id: profile.id,
        username: profile.username,
        full_name: profile.full_name,
        role: profile.role || (profile.username === 'admin' ? 'admin' : 'user'),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Có lỗi xảy ra',
    };
  }
}

function getOrCreateClientId(): string {
  if (typeof window === 'undefined') return 'server';
  const key = 'app_client_id';
  let id = window.localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(key, id);
  }
  return id;
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Có lỗi xảy ra',
    };
  }
}

export async function getCurrentUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, username, full_name, role')
      .eq('id', user.id)
      .single();

    if (profileError) {
      return null;
    }

    return {
      id: profile.id,
      username: profile.username,
      full_name: profile.full_name,
      role: profile.role || (profile.username === 'admin' ? 'admin' : 'user'),
    };
  } catch (error) {
    return null;
  }
}

export async function changePassword(payload: ChangePasswordPayload) {
  try {
    const { data: userData, error: userErr } = await withTimeout(
      supabase.auth.getUser(),
      8000,
      'Không thể kiểm tra phiên đăng nhập'
    );
    if (userErr || !userData?.user) {
      throw new Error('Bạn cần đăng nhập trước khi đổi mật khẩu');
    }
    let { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session) {
      const { data: refreshed } = await supabase.auth.refreshSession();
      sessionData = refreshed;
    }
    if (!sessionData?.session) {
      throw new Error('Không thể kiểm tra phiên đăng nhập');
    }

    const username = (sessionData.session.user.user_metadata as any)?.username;
    if (!username) {
      throw new Error('Không tìm thấy username trong hồ sơ người dùng');
    }
    const fakeEmail = `${username}${USERNAME_EMAIL_SUFFIX}`;
    const { data: verifyData, error: verifyError } = await withTimeout(
      supabaseLite.auth.signInWithPassword({
        email: fakeEmail,
        password: payload.currentPassword,
      }),
      8000,
      'Không thể xác thực mật khẩu hiện tại'
    );
    if (verifyError || !verifyData.user) {
      throw new Error('Mật khẩu hiện tại không đúng');
    }

    const accessToken = sessionData.session.access_token;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const updateRes = await withTimeout(
      fetch(`${supabaseUrl}/auth/v1/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ password: payload.newPassword }),
      }),
      10000,
      'Đổi mật khẩu quá thời gian. Vui lòng thử lại.'
    );
    if (!updateRes.ok) {
      const text = await updateRes.text().catch(() => '');
      throw new Error(
        text || `Cập nhật mật khẩu thất bại (${updateRes.status})`
      );
    }

    if (payload.signOutAfter) {
      await withTimeout(
        supabase.auth.signOut(),
        5000,
        'Đăng xuất quá thời gian'
      );
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Có lỗi xảy ra',
    };
  }
}
