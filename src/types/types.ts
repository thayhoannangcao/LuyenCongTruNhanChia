// Vietnamese comments: Định nghĩa type dùng chung

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  signOutAfter?: boolean;
}

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

export type InputSize = 'sm' | 'md' | 'lg' | 'xl';
