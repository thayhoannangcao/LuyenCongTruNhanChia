import {
  UserService,
  type CreateUserData,
  type UpdateUserData,
} from '@/backend/services/userService';

export interface AdminUser {
  id: string;
  username: string;
  full_name: string;
  role: 'admin' | 'user';
  created_at: string;
}

export type { CreateUserData, UpdateUserData };

export class UserController {
  private userService = new UserService();

  async getUsers() {
    return await this.userService.getUsers();
  }

  async createUser(data: CreateUserData) {
    return await this.userService.createUser(data);
  }

  async updateUser(data: UpdateUserData) {
    return await this.userService.updateUser(data);
  }

  async deleteUser(id: string) {
    return await this.userService.deleteUser(id);
  }
}
