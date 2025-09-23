import { AuthService } from '../services/authService';
import type {
  SignInData,
  SignUpData,
  ChangePasswordPayload,
} from '../../src/types/types';

export class AuthController {
  private authService = new AuthService();

  async signUp(data: SignUpData) {
    return await this.authService.signUp(data);
  }

  async signIn(data: SignInData) {
    return await this.authService.signIn(data);
  }

  async signOut() {
    return await this.authService.signOut();
  }

  async getCurrentUser() {
    return await this.authService.getCurrentUser();
  }

  async changePassword(payload: ChangePasswordPayload) {
    return await this.authService.changePassword(payload);
  }
}
