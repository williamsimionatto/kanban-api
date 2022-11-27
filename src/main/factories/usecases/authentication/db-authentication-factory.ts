import { DbAuthentication } from '../../../../data/usecases'
import { Authentication } from '../../../../domain/usecases'
import { BcryptAdapter, JwtAdapter } from '../../../../infra/cryptography'
import { AccountMongoRepository } from '../../../../infra/db/mongodb'
import env from '../../../config/env'

export const makeDbAuthentication = (): Authentication => {
  const accountMongoRepository = new AccountMongoRepository()
  const brcypAdapter = new BcryptAdapter(12)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    brcypAdapter,
    jwtAdapter,
    accountMongoRepository
  )

  return dbAuthentication
}
