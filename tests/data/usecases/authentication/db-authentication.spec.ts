import { HashComparer } from '../../../../src/data/protocols/cryptography'
import { LoadAccountByEmailRepository } from '../../../../src/data/protocols/db/account'
import { DbAuthentication } from '../../../../src/data/usecases'
import { Authentication } from '../../../../src/domain/usecases'

const mockAuthentication = (): Authentication.Params => {
  return {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
      const account: LoadAccountByEmailRepository.Result = {
        id: 'any_id',
        name: 'any_name',
        password: 'hashed_password'
      }

      return Promise.resolve(account)
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const makeHashCompare = (): HashComparer => {
  class HashCompareStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }

  return new HashCompareStub()
}

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashCompareStub: HashComparer
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashCompareStub = makeHashCompare()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashCompareStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub
  }
}

describe('DbAuthentication Usecase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(mockAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
    const accessToken = await sut.auth(mockAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashCompareStub } = makeSut()
    const hashComparerSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(mockAuthentication())
    expect(hashComparerSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })
})
