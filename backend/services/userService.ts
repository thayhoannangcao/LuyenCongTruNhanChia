import { supabaseAdmin } from '../../lib/supabase-admin';
import { USERNAME_EMAIL_SUFFIX } from '../../src/constants/base.constants';

export interface CreateUserData {
  username: string;
  full_name: string;
  password: string;
  role?: 'admin' | 'user';
}

export interface UpdateUserData {
  id: string;
  username: string;
  full_name: string;
  role: 'admin' | 'user';
}

export class UserService {
  async getUsers() {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('id, username, full_name, role, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, users: data };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Không thể tải danh sách users',
      };
    }
  }

  async createUser(data: CreateUserData) {
    try {
      const { username, full_name, password, role } = data;

      if (!username || !full_name || !password) {
        throw new Error('Thiếu dữ liệu bắt buộc');
      }

      // Tạo auth user bằng service role
      const email = `${username}${USERNAME_EMAIL_SUFFIX}`;
      const { data: created, error: createErr } =
        await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { username, full_name },
        });

      if (createErr || !created.user) {
        throw new Error(createErr?.message || 'Không tạo được user auth');
      }

      const { data: user, error } = await supabaseAdmin
        .from('users')
        .insert({
          id: created.user.id,
          username,
          full_name,
          role: role || 'user',
        })
        .select('id, username, full_name, role, created_at')
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Không thể tạo user',
      };
    }
  }

  async updateUser(data: UpdateUserData) {
    try {
      const { id, username, full_name, role } = data;

      const { data: user, error } = await supabaseAdmin
        .from('users')
        .update({ username, full_name, role })
        .eq('id', id)
        .select('id, username, full_name, role, created_at')
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Không thể cập nhật user',
      };
    }
  }

  async deleteUser(id: string) {
    try {
      if (!id) {
        throw new Error('Missing id');
      }

      const { error } = await supabaseAdmin.from('users').delete().eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      // Xóa luôn auth user để tránh đăng nhập được nhưng thiếu profile
      const { error: authErr } = await supabaseAdmin.auth.admin.deleteUser(id);
      if (authErr) {
        throw new Error(authErr.message);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Không thể xóa user',
      };
    }
  }
}
