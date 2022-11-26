import { makeAddOrganizationMembersValidation } from '../../../../src/main/factories/controllers/organization-member'
import { Validation } from '../../../../src/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../../src/validation/validators'

jest.mock('../../../../src/validation/validators/validation-composite')

describe('AddOrganizationMemberValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddOrganizationMembersValidation()
    const validations: Validation[] = []
    for (const field of ['organizationId', 'accountId']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
