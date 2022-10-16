import { Encrypter } from '../../data/protocols/cryptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt (plainText: string): Promise<string> {
    await jwt.sign({ id: plainText }, this.secret)
    return null
  }
}
