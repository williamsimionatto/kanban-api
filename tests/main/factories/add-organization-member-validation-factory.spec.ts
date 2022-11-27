import { makeAddProjectMembersValidation } from '../../../src/main/factories/controllers/project-member'
import { Validation } from '../../../src/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../src/validation/validators'

jest.mock('../../../src/validation/validators/validation-composite')

describe('AddProjectMemberValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddProjectMembersValidation()
    const validations: Validation[] = []
    for (const field of ['projectId', 'accountId']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
