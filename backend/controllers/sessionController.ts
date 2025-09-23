import { SessionService } from '../services/sessionService';
import type { ExerciseConfig } from '../../lib/math-generator';

export class SessionController {
  private sessionService = new SessionService();

  async createSession(data: { userId: string; config: ExerciseConfig }) {
    return await this.sessionService.createSession(data);
  }

  async updateSession(data: {
    sessionId: string;
    correctAnswers: number;
    incorrectAnswers: number;
  }) {
    return await this.sessionService.updateSession(data);
  }

  async saveResult(data: {
    sessionId: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    timeTaken: number;
  }) {
    return await this.sessionService.saveResult(data);
  }
}
