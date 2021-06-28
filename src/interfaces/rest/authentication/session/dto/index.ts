import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateSessionDTO {
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}