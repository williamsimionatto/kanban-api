import { makeAddProjectPhaseController } from '../../../src/main/factories/controllers/project-phase'
import { Validation } from '../../../src/presentation/protocols'
import { IncludesValidation, RequiredFieldValidation, ValidationComposite } from '../../../src/validation/validators'

jest.mock('../../../src/validation/validators/validation-composite')

describe('AddProjectPhaseValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddProjectPhaseController()
    const validations: Validation[] = []
    for (const field of ['projectId', 'name', 'description', 'order', 'type']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new IncludesValidation('type', ['BACKLOG', 'TODO', 'DOING', 'BLOCKED', 'REVIEW', 'DONE']))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
