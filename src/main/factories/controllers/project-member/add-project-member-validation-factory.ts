import { Validation } from '../../../../presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'

export const makeAddProjectMembersValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['projectId', 'accountId']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
