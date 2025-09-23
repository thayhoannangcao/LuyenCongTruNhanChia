import { SessionController } from '../controllers/sessionController';
import type { ExerciseConfig } from '../../lib/math-generator';

class SessionApi {
  private controller = new SessionController();

  async createSession(userId: string, config: ExerciseConfig) {
    return await this.controller.createSession({ userId, config });
  }

  async updateSession(
    sessionId: string,
    correctAnswers: number,
    incorrectAnswers: number
  ) {
    return await this.controller.updateSession({
      sessionId,
      correctAnswers,
      incorrectAnswers,
    });
  }

  async saveResult(
    sessionId: string,
    question: string,
    userAnswer: string,
    correctAnswer: string,
    isCorrect: boolean,
    timeTaken: number
  ) {
    return await this.controller.saveResult({
      sessionId,
      question,
      userAnswer,
      correctAnswer,
      isCorrect,
      timeTaken,
    });
  }
}

export const sessionApi = new SessionApi();
