import { Session } from "../../domain";

export class SessionRepository {
  sessions: Record<string, Session>;

  constructor() {
    this.sessions = {}
  }

  async create(data: Session) {
    try {
      this.sessions[data.accessToken] = data

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findMany(condition?: Partial<Session>) {
    return [] as Session[]
  }

  async destroyByAccessToken(accessToken: string) {
    delete this.sessions[accessToken]
  }
}