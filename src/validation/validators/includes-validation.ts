import { EnumError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'

export class IncludesValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly enumValues: string[]
  ) {}

  validate (input: any): Error {
    if (!this.enumValues.includes(input[this.fieldName])) {
      return new EnumError(this.fieldName, this.enumValues)
    }
  }
}
