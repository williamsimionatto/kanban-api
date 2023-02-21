export class DataIntegrityViolationError extends Error {
  constructor (paramName: string) {
    super(`Param ${paramName} is not unique`)
    this.name = 'DataIntegrityViolationError'
  }
}
