import faker from 'faker'

import { LoadAccountByTokenRepository } from '../../../src/data/protocols/db/account'
import { DbLoadAccountByToken } from '../../../src/data/usecases/'
import { throwError } from '../../domain/mocks'
import { DecrypterSpy } from '../mocks'

const makeFakeAccount = (): LoadAccountByTokenRepository.Result => ({
  id: 'any_id'
})

const makeLoadAccountByTokenRepositoryStub = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new LoadAccountByTokenRepositoryStub()
}

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepositoryStub()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositoryStub)

  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositoryStub
  }
}

let token: string
let role: string

describe('DbLoadAccountBytToken Usecase', () => {
  beforeEach(() => {
    token = faker.datatype.uuid()
    role = faker.random.word()
  })

  test('Should call Decrypter with correct ciphertext', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load(token, role)
    expect(decrypterSpy.ciphertext).toBe(token)
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.plaintext = null
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const promise = sut.load(token, role)
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(makeFakeAccount())
  })

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })
})
