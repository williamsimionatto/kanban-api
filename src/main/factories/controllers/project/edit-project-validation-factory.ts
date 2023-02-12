import { Validation } from '../../../../presentation/protocols'
import { IncludesValidation, RequiredFieldValidation, ValidationComposite, DateValidation } from '../../../../validation/validators'

export const makeEditProjectValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id', 'name', 'description', 'status', 'startDate', 'organizationId']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new DateValidation('startDate', 'endDate'))
  validations.push(new IncludesValidation('status', ['active', 'inactive', 'done']))
  return new ValidationComposite(validations)
}
