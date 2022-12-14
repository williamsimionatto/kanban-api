import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '../../../data/protocols/db/account'

import { ObjectId } from 'mongodb'
import { MongoHelper } from './mongo-helper'

export class AccountMongoRepository implements
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  CheckAccountByEmailRepository,
  LoadAccountByTokenRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = Object.assign({}, data, { organizationId: new ObjectId(data.organizationId) })
    const result = await accountCollection.insertOne(account)
    return result !== null
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        accessToken: token
      }
    })
  }

  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account !== null
  }

  async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    }, {
      projection: {
        _id: 1
      }
    })
    return account && MongoHelper.map(account)
  }
}
