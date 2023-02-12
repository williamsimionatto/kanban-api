import { Validation } from '../../../../presentation/protocols'
import { BooleanFieldValidation, RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'

export const makeStatusProjectMemberValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['projectId', 'accountId']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new BooleanFieldValidation('active'))

  return new ValidationComposite(validations)
}
