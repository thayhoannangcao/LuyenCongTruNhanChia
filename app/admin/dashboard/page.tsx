'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/components/layouts/AuthProvider';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/ToastProvider';
import Modal from '@/components/ui/Modal';

interface AdminUser {
  id: string;
  username: string;
  full_name: string;
  role: 'admin' | 'user';
  created_at: string;
}

export default function AdminDashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/auth/login');
      return;
    }
    if (user.role !== 'admin') {
      router.replace('/dashboard');
      return;
    }
    loadUsers();
  }, [loading, user]);

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await fetch('/api/admin/users', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Không tải được users');
      setUsers(data.users);
    } catch (e: any) {
      toast.error(e.message || 'Lỗi tải danh sách users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const stats = useMemo(() => {
    const byDay = new Map<string, number>();
    const byMonth = new Map<string, number>();
    const byYear = new Map<string, number>();
    users.forEach((u) => {
      const d = new Date(u.created_at);
      const dayKey = d.toISOString().slice(0, 10);
      const monthKey = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
      const yearKey = `${d.getFullYear()}`;
      byDay.set(dayKey, (byDay.get(dayKey) || 0) + 1);
      byMonth.set(monthKey, (byMonth.get(monthKey) || 0) + 1);
      byYear.set(yearKey, (byYear.get(yearKey) || 0) + 1);
    });
    return { byDay, byMonth, byYear };
  }, [users]);

  if (loading || loadingUsers) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto space-y-8 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="space-x-2">
            <button className="btn-secondary" onClick={loadUsers}>
              Tải lại
            </button>
            <button className="btn-secondary" onClick={signOut}>
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ChartCard title="Đăng ký theo ngày" dataMap={stats.byDay} />
          <ChartCard title="Đăng ký theo tháng" dataMap={stats.byMonth} />
          <ChartCard title="Đăng ký theo năm" dataMap={stats.byYear} />
        </div>

        {/* Users table */}
        <UsersTable
          users={users}
          onChanged={loadUsers}
          onClickCreate={() => setShowCreate(true)}
        />
        <CreateUserModal
          open={showCreate}
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false);
            loadUsers();
          }}
        />
      </div>
    </div>
  );
}

function ChartCard({
  title,
  dataMap,
}: {
  title: string;
  dataMap: Map<string, number>;
}) {
  const entries = Array.from(dataMap.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  );
  const max = Math.max(1, ...entries.map(([, v]) => v));
  return (
    <div className="rounded-md bg-white p-4 shadow">
      <div className="mb-2 font-semibold">{title}</div>
      <div className="flex h-40 items-end gap-2">
        {entries.map(([label, value]) => (
          <div key={label} className="flex-1">
            <div
              className="rounded-t-sm bg-primary-600"
              style={{ height: `${(value / max) * 100}%` }}
            />
            <div className="mt-1 truncate text-center text-[10px] text-gray-500">
              {label}
            </div>
          </div>
        ))}
        {entries.length === 0 && (
          <div className="text-sm text-gray-500">Chưa có dữ liệu</div>
        )}
      </div>
    </div>
  );
}

function CreateUserModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}) {
  const toast = useToast();
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!username || !fullName || !password) {
      toast.error('Vui lòng nhập đủ Username/Họ tên/Mật khẩu');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, full_name: fullName, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Tạo user thất bại');
      toast.success('Tạo user thành công');
      setUsername('');
      setFullName('');
      setPassword('');
      setRole('user');
      onCreated();
    } catch (e: any) {
      toast.error(e.message || 'Lỗi tạo user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Tạo user mới"
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>
            Hủy
          </button>
          <button className="btn-primary" onClick={submit} disabled={loading}>
            {loading ? 'Đang tạo...' : 'Tạo user'}
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-3">
        <div>
          <div className="mb-1 text-sm">Username</div>
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-1 text-sm">Họ tên</div>
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Họ tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-1 text-sm">Mật khẩu</div>
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-1 text-sm">Role</div>
          <select
            className="w-full rounded border px-3 py-2"
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>
      </div>
    </Modal>
  );
}

function UsersTable({
  users,
  onChanged,
  onClickCreate,
}: {
  users: AdminUser[];
  onChanged: () => void;
  onClickCreate: () => void;
}) {
  const toast = useToast();
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [form, setForm] = useState<Partial<AdminUser>>({});
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const startEdit = (u: AdminUser) => {
    setEditing(u);
    setForm(u);
  };
  const cancelEdit = () => {
    setEditing(null);
    setForm({});
  };

  const saveEdit = async () => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: form.id,
          username: form.username,
          full_name: form.full_name,
          role: form.role,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Cập nhật thất bại');
      toast.success('Cập nhật user thành công');
      onChanged();
      cancelEdit();
    } catch (e: any) {
      toast.error(e.message || 'Lỗi cập nhật user');
    }
  };

  const doDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Xóa thất bại');
      toast.success('Xóa user thành công');
      onChanged();
    } catch (e: any) {
      toast.error(e.message || 'Lỗi xóa user');
    }
  };

  return (
    <div className="rounded-md bg-white p-4 shadow">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-semibold">Quản lý người dùng</div>
        <button className="btn-primary" onClick={onClickCreate}>
          Thêm
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="py-2 pr-4">Username</th>
              <th className="py-2 pr-4">Họ tên</th>
              <th className="py-2 pr-4">Role</th>
              <th className="py-2 pr-4">Ngày tạo</th>
              <th className="py-2 pr-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b last:border-0">
                <td className="py-2 pr-4">
                  {editing?.id === u.id ? (
                    <input
                      className="rounded border px-2 py-1"
                      value={form.username || ''}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    u.username
                  )}
                </td>
                <td className="py-2 pr-4">
                  {editing?.id === u.id ? (
                    <input
                      className="rounded border px-2 py-1"
                      value={form.full_name || ''}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          full_name: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    u.full_name
                  )}
                </td>
                <td className="py-2 pr-4">
                  {editing?.id === u.id ? (
                    <select
                      className="rounded border px-2 py-1"
                      value={form.role || 'user'}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          role: e.target.value as any,
                        }))
                      }
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  ) : (
                    u.role
                  )}
                </td>
                <td className="py-2 pr-4">
                  {new Date(u.created_at).toLocaleString()}
                </td>
                <td className="space-x-2 py-2 pr-4 text-right">
                  {editing?.id === u.id ? (
                    <>
                      <button className="btn-secondary" onClick={saveEdit}>
                        Lưu
                      </button>
                      <button className="btn-secondary" onClick={cancelEdit}>
                        Hủy
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn-secondary"
                        onClick={() => startEdit(u)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn-secondary text-red-600"
                        onClick={() => setConfirmId(u.id)}
                      >
                        Xóa
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        open={!!confirmId}
        onClose={() => setConfirmId(null)}
        title="Xác nhận xóa"
        footer={
          <>
            <button
              className="btn-secondary"
              onClick={() => setConfirmId(null)}
            >
              Hủy
            </button>
            <button
              className="btn-secondary text-red-600"
              onClick={() => {
                if (confirmId) {
                  const id = confirmId;
                  setConfirmId(null);
                  doDelete(id);
                }
              }}
            >
              Xóa
            </button>
          </>
        }
      >
        <div>
          Bạn có chắc chắn muốn xóa user này? Hành động không thể hoàn tác.
        </div>
      </Modal>
    </div>
  );
}
