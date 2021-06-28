import { Session } from "../../domain";

export interface SessionRepository {
  create(session: Session): Promise<Session>
  findMany(condition?: Partial<Session>): Promise<Session[]>
  destroyByAccessToken(accessToken: string): Promise<void>
}