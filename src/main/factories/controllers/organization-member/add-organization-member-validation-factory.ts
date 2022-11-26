import { Validation } from '../../../../presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'

export const makeAddOrganizationMembersValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['organizationId', 'accountId']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
