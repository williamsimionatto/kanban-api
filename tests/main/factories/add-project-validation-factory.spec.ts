import { makeAddProjectController } from '../../../src/main/factories/controllers/project'
import { Validation } from '../../../src/presentation/protocols'
import { DateValidation, IncludesValidation, RequiredFieldValidation, ValidationComposite } from '../../../src/validation/validators'

jest.mock('../../../src/validation/validators/validation-composite')

describe('AddProjectValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddProjectController()
    const validations: Validation[] = []
    for (const field of ['name', 'description', 'status', 'startDate']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new DateValidation('startDate', 'endDate'))
    validations.push(new IncludesValidation('status', ['active', 'inactive', 'done']))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
