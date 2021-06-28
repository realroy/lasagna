import * as argon2 from "argon2";

export class Argon2 {
  async hash(s: string) {
    try {
      const result = await argon2.hash(s)
      
      return result
    } catch (err) {
      throw err
    }
  }

  async compare({ hash, s } : { hash: string, s: string }) {
    try {
      const isMatch = await argon2.verify(hash, s)

      return isMatch
    } catch (err) {
      throw err
    }
  }
}