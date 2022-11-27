import { DbLoadAccountByToken } from '../../../../data/usecases/'
import { LoadAccountByToken } from '../../../../domain/usecases'
import { JwtAdapter } from '../../../../infra/cryptography'
import { AccountMongoRepository } from '../../../../infra/db/mongodb'
import env from '../../../config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
