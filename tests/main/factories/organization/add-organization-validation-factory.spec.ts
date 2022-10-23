import { makeAddOrganizationValidation } from '../../../../src/main/factories/controllers/organization'
import { Validation } from '../../../../src/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../../src/validation/validators'

jest.mock('../../../../src/validation/validators/validation-composite')

describe('AddOrganizationValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddOrganizationValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'description']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
