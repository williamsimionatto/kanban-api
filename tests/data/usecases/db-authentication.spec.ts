import { Encrypter, HashComparer } from '../../../src/data/protocols/cryptography'
import { UpdateAccessTokenRepository } from '../../../src/data/protocols/db/account'
import { DbAuthentication } from '../../../src/data/usecases'
import { Authentication } from '../../../src/domain/usecases'

import { throwError } from '../../domain/mocks'
import { LoadAccountByEmailRepositorySpy } from '../mocks'

const mockAuthentication = (): Authentication.Params => {
  return {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
}

const makeHashCompare = (): HashComparer => {
  class HashCompareStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }

  return new HashCompareStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (plaintext: string): Promise<string> {
      return Promise.resolve('any_token')
    }
  }

  return new EncrypterStub()
}

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new UpdateAccessTokenRepositoryStub()
}

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashCompareStub: HashComparer
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashCompareStub = makeHashCompare()
  const encrypterStub = makeEncrypter()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hashCompareStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  )

  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashCompareStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication Usecase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationData = mockAuthentication()
    await sut.auth(authenticationData)
    expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationData.email)
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
    const accessToken = await sut.auth(mockAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashCompareStub } = makeSut()
    const hashComparerSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(mockAuthentication())
    expect(hashComparerSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const accessToken = await sut.auth(mockAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct plaintext', async () => {
    const { sut, encrypterStub } = makeSut()
    const generateSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockAuthentication())
    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an accessToken on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(mockAuthentication())
    expect(accessToken).toBe('any_token')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockAuthentication())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
