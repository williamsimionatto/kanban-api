import { Validation } from '../../../../presentation/protocols'
import { IncludesValidation, RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'

export const makeAddProjectPhaseValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['projectId', 'name', 'description', 'order', 'type']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new IncludesValidation('type', ['BACKLOG', 'TODO', 'DOING', 'BLOCKED', 'REVIEW', 'DONE']))

  return new ValidationComposite(validations)
}
