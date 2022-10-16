import { Collection } from 'mongodb'

import { AddAccountRepository } from '../../../../../src/data/protocols/db/account'
import { AccountMongoRepository } from '../../../../../src/infra/db/mongodb/account'
import { MongoHelper } from '../../../../../src/infra/db/mongodb/helpers'

const makeFakeAccountData = (): AddAccountRepository.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut()
      const isValid = await sut.add(makeFakeAccountData())

      expect(isValid).toBe(true)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      const addAccountParams = makeFakeAccountData()
      await accountCollection.insertOne(addAccountParams)
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_mail@mail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const res = await accountCollection.insertOne(makeFakeAccountData())
      const fakeAccount = await accountCollection.findOne({ _id: res.insertedId })
      expect(fakeAccount.accessToken).toBeFalsy()

      const accessToken = 'any_token'
      await sut.updateAccessToken(fakeAccount._id.toString(), accessToken)

      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe(accessToken)
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true if email is already in use', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(makeFakeAccountData())
      const isValid = await sut.checkByEmail('any_email@mail.com')
      expect(isValid).toBe(true)
    })

    test('Should return false if email is not in use', async () => {
      const sut = makeSut()
      const isValid = await sut.checkByEmail('any_email@mail.com')
      expect(isValid).toBe(false)
    })
  })
})