import { Validation } from '../../../../presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'

export const makeAddOrganizationValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'description']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
