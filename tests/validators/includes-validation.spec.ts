import { EnumError } from '../../src/presentation/errors'
import { IncludesValidation } from '../../src/validation/validators/includes-validation'

const makeSut = (): IncludesValidation => {
  return new IncludesValidation('field', ['valid_value1', 'valid_value2'])
}

describe('Includes Validation', () => {
  test('Should return EnumError if value is not included in enum', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'invalid_value'
    })
    expect(error).toEqual(new EnumError('field', ['valid_value1', 'valid_value2']))
  })

  test('Should not return if value is included in enum', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'valid_value2'
    })
    expect(error).toBeFalsy()
  })
})
