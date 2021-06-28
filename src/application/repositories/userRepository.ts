import { User } from "../../domain";

export interface UserRepository {
  create(user: User): Promise<User>
  findOneByEmail(email: string): Promise<User>
}