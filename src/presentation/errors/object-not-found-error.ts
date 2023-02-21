export class ObjectNotFoundError extends Error {
  constructor (paramName: string, value: string) {
    super(`Object not found with ${paramName}: ${value}`)
    this.name = 'ObjectNotFoundError'
  }
}
