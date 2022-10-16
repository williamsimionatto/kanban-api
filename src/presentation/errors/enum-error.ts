export class EnumError extends Error {
  constructor (field: string, enumValues: any[]) {
    super(`The received ${field} is not valid. Valid values are: ${enumValues.join(', ')}`)
    this.name = 'EnumError'
  }
}
