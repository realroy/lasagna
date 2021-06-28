import { User } from "../../domain"

import { UserRepository } from "../repositories"
import { SessionRepository } from "../repositories/sessionRepository"
import { wrapPromise } from "../utils"


export type RegisterUserArg = {
  user: Omit<User, 'id'>,
  userRepository: UserRepository
  sessionRepository: SessionRepository
  hashFunction: (s: string) => Promise<string>
}

export class UserAlreadyExistedException extends Error {}

export const registerUser = async (arg: RegisterUserArg) => {
  const [persistedUser, findUserError] = await wrapPromise({ f: arg.userRepository.findOneByEmail, args: arg.user.email })
  
  if (findUserError) {
    throw findUserError
  }

  if (persistedUser) {
    throw new UserAlreadyExistedException()
  }

  const [digestPassword, compareHashError] = await wrapPromise({ f: arg.hashFunction,
                                                                  args: arg.user.password })

  if (compareHashError) {
    throw compareHashError
  }

  const user = { email: arg.user.email, password: digestPassword } as User

  const [createUserResult, createUserError] = await wrapPromise({ f: arg.userRepository.create,
                                                    args: user })  
  if (createUserError) {
    throw createUserError
  }

  return createUserResult
}