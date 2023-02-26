import { AddSprint } from '../../domain/usecases'
import { AddSprintRepository } from '../protocols/db/sprint'

export class DbAddSprint implements AddSprint {
  constructor (
    private readonly addSprintRepository: AddSprintRepository
  ) {}

  async add (sprintData: AddSprint.Params): Promise<void> {
    await this.addSprintRepository.add(sprintData)
    return null
  }
}
