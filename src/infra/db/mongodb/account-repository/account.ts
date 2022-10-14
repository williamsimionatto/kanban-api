import { AddAccountRepository } from '../../../../data/protocols/db/account'
import { MongoHelper } from '../helpers'

export class AccountMongoRepository implements AddAccountRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(data)
    return result !== null
  }
}
