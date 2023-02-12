import {
  AddProjectRepository,
  CheckProjectByIdRepository,
  CheckProjectMemberRepository,
  EditProjectRepository,
  LoadProjectByIdRepository,
  LoadProjectsByOrganizationRepository
} from '../../../src/data/protocols/db/project'
import { mockOrganizationProjectsModel, mockProjectModelWithMembers } from '../../domain/mocks'

export class CheckProjectByIdRepositorySpy implements CheckProjectByIdRepository {
  id: string
  result = true

  async checkById (id: string): Promise<CheckProjectByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadProjectsByOrganizationRepositorySpy implements LoadProjectsByOrganizationRepository {
  organizationId: string
  result = mockOrganizationProjectsModel()

  async loadByOrganization (organizationId: string): Promise<LoadProjectsByOrganizationRepository.Result[]> {
    this.organizationId = organizationId
    return this.result
  }
}

export class CheckProjectMemberRepositorySpy implements CheckProjectMemberRepository {
  params: CheckProjectMemberRepository.Params
  result = true

  async checkMember (params: CheckProjectMemberRepository.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}

export class AddProjectRepositorySpy implements AddProjectRepository {
  params: AddProjectRepository.Params
  result = true

  async add (params: AddProjectRepository.Params): Promise<void> {
    this.params = params
  }
}

export class LoadProjectByIdRepositorySpy implements LoadProjectByIdRepository {
  id: string
  result = mockProjectModelWithMembers()

  async loadById (id: string): Promise<LoadProjectByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class EditProjectRepositorySpy implements EditProjectRepository {
  params: EditProjectRepository.Params
  result = true

  async edit (params: EditProjectRepository.Params): Promise<void> {
    this.params = params
  }
}
