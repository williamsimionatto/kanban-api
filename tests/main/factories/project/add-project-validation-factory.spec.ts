import { makeAddProjectController } from '../../../../src/main/factories/controllers/project'
import { Validation } from '../../../../src/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../../src/validation/validators'

jest.mock('../../../../src/validation/validators/validation-composite')

describe('AddProjectValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddProjectController()
    const validations: Validation[] = []
    for (const field of ['name', 'description', 'status', 'startDate']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
