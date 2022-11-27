import { CheckProjectById } from '../../../src/domain/usecases/check-project-by-id'

export class CheckProjectByIdSpy implements CheckProjectById {
  id: string
  result = true

  async checkById (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}
