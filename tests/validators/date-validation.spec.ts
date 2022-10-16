import { InvalidParamError } from '../../src/presentation/errors'
import { DateValidation } from '../../src/validation/validators/date-validation'

import faker from 'faker'

const makeSut = (): DateValidation => {
  return new DateValidation('startDate', 'endDate')
}

describe('DateValidation', () => {
  test('Should return InvalidParamError if end date is greater then start date', () => {
    const sut = makeSut()
    const error = sut.validate({
      startDate: faker.date.future(),
      endDate: faker.date.past()
    })
    expect(error).toEqual(new InvalidParamError('endDate'))
  })

  test('Should not return if start date is greater then end date', () => {
    const sut = makeSut()
    const error = sut.validate({
      startDate: faker.date.past(),
      endDate: faker.date.future()
    })
    expect(error).toBeFalsy()
  })

  test('Should not return if start date is equal to end date', () => {
    const sut = makeSut()
    const date = faker.date.future()
    const error = sut.validate({
      startDate: date,
      endDate: date
    })
    expect(error).toBeFalsy()
  })

  test('Should not return if end date is not provided', () => {
    const sut = makeSut()
    const error = sut.validate({
      startDate: faker.date.past()
    })
    expect(error).toBeFalsy()
  })

  test('Should not return if end date is null', () => {
    const sut = makeSut()
    const error = sut.validate({
      startDate: faker.date.past(),
      endDate: null
    })
    expect(error).toBeFalsy()
  })
})
