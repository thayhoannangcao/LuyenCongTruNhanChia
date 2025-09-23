export interface User {
  id: string;
  username: string;
  full_name: string;
  role: 'admin' | 'user';
  current_client_id?: string;
  created_at: string;
  updated_at?: string;
}

export interface UserCreateRequest {
  username: string;
  full_name: string;
  password: string;
  role?: 'admin' | 'user';
}

export interface UserUpdateRequest {
  id: string;
  username: string;
  full_name: string;
  role: 'admin' | 'user';
}

export interface UserResponse {
  id: string;
  username: string;
  full_name: string;
  role: 'admin' | 'user';
  created_at: string;
}
