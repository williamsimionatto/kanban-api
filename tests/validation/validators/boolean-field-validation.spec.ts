import { InvalidParamError, MissingParamError } from '../../../src/presentation/errors'
import { BooleanFieldValidation } from '../../../src/validation/validators'

const makeSut = (): BooleanFieldValidation => new BooleanFieldValidation('field')

describe('BooleanField Validation', () => {
  test('Should return MissingParamError if validation fails with undefined value', () => {
    const sut = makeSut()
    const error = sut.validate({ field: undefined })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return InvalidParamError if validation fails with not boolean value', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new InvalidParamError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: true })
    expect(error).toBeFalsy()
  })
})
