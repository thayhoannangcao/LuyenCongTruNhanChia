// Vietnamese comments: Định nghĩa type dùng chung

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  signOutAfter?: boolean;
}

export type InputSize = 'sm' | 'md' | 'lg' | 'xl';
