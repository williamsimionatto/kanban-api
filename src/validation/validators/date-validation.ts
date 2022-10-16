import { InvalidParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'

export class DateValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate (input: any): Error {
    const date = new Date(input[this.field])
    const dateToCompare = new Date(input[this.fieldToCompare])

    if (dateToCompare && date > dateToCompare) {
      return new InvalidParamError(this.fieldToCompare)
    }
  }
}
