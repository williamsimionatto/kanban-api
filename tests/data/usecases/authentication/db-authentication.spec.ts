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

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAuthentication Usecase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(mockAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
