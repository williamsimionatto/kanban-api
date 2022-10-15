import { makeSignUpValidation } from '../../../src/main/factories'
import { Validation } from '../../../src/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../src/validation/validators'

jest.mock('../../../src/validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
