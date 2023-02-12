import { InvalidParamError, MissingParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'

export class BooleanFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (input[this.fieldName] === undefined) {
      return new MissingParamError(this.fieldName)
    }

    if (typeof input[this.fieldName] !== 'boolean') {
      return new InvalidParamError(this.fieldName)
    }
  }
}
