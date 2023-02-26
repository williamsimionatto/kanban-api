import { AddSprintRepository } from '../../../src/data/protocols/db/sprint'

export class AddSprintRepositorySpy implements AddSprintRepository {
  params: AddSprintRepository.Params
  result = true

  async add (params: AddSprintRepository.Params): Promise<void> {
    this.params = params
  }
}
