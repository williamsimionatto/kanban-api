import { MissingParamError } from '../../src/presentation/errors'
import { Validation } from '../../src/presentation/protocols'
import { ValidationComposite } from '../../src/validation/validators'

const makeSut = (): ValidationComposite => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return new MissingParamError('field')
    }
  }

  const validationStub = new ValidationStub()
  return new ValidationComposite([validationStub])
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
