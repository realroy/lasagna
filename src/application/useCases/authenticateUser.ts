import { UserNotFoundException, UserPasswordMismatchException, UserComparePasswordException } from "../exceptions"
import { UserRepository } from "../repositories"
import { wrapPromise } from "../utils"

export type AuthenticateUserArgs = {
  email: string
  password: string
  userRepository: UserRepository
  compareHashFunction: ({ s, hash }: { s: string, hash: string }) => Promise<boolean>
}

export const authenticateUser = async ({ email, userRepository, compareHashFunction, password }: AuthenticateUserArgs) => {
  const [user, findUserError] = await wrapPromise({ f: userRepository.findOneByEmail,
                                                    args: email })  
  if (findUserError) {
    throw new UserNotFoundException()
  }

  const [isPasswordMatch, compareHashError] = await wrapPromise({ f: compareHashFunction,
                                                                  args: { s: password, hash: user.password } })

  if (compareHashError) {
    throw new UserComparePasswordException()
  }


  if (!isPasswordMatch) {
    throw new UserPasswordMismatchException()
  }

  return user
}