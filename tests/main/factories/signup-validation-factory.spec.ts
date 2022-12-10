import { EmailValidatorAdapter } from '../../../src/infra/validators'
import { makeSignUpValidation } from '../../../src/main/factories/controllers/signup'
import { Validation } from '../../../src/presentation/protocols'
import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../src/validation/validators'

jest.mock('../../../src/validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
