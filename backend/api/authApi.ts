import { AuthController } from '../controllers/authController';
import type {
  SignInData,
  SignUpData,
  ChangePasswordPayload,
} from '../../src/types/types';

class AuthApi {
  private controller = new AuthController();

  async signUp(data: SignUpData) {
    return await this.controller.signUp(data);
  }

  async signIn(data: SignInData) {
    return await this.controller.signIn(data);
  }

  async signOut() {
    return await this.controller.signOut();
  }

  async getCurrentUser() {
    return await this.controller.getCurrentUser();
  }

  async changePassword(payload: ChangePasswordPayload) {
    return await this.controller.changePassword(payload);
  }
}

export const authApi = new AuthApi();
