import { UserController } from '../controllers/userController';
import type {
  CreateUserData,
  UpdateUserData,
} from '../controllers/userController';

class UserApi {
  private controller = new UserController();

  async getUsers() {
    return await this.controller.getUsers();
  }

  async createUser(data: CreateUserData) {
    return await this.controller.createUser(data);
  }

  async updateUser(data: UpdateUserData) {
    return await this.controller.updateUser(data);
  }

  async deleteUser(id: string) {
    return await this.controller.deleteUser(id);
  }
}

export const userApi = new UserApi();
