export class Session {
  readonly id: number
  readonly accessToken: string
  readonly userId: number
  readonly createdAt: Date
  readonly revokedAt: Date
}