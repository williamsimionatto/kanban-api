import { AddProject, AddProjectMembers, CheckProjectMember, EditProject, LoadProjectsByOrganization } from '../../../src/domain/usecases'
import { CheckProjectById } from '../../../src/domain/usecases/check-project-by-id'
import { LoadProjectById } from '../../../src/domain/usecases/load-project-by-id'
import { mockOrganizationProjectsModel, mockProjectModelWithMembers } from '../../domain/mocks'

export class CheckProjectByIdSpy implements CheckProjectById {
  id: string
  result = true

  async checkById (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}

export class LoadProjectsByOrganizationSpy implements LoadProjectsByOrganization {
  organizationId: string
  result = mockOrganizationProjectsModel()

  async loadByOrganization (organizationId: string): Promise<LoadProjectsByOrganization.Result[]> {
    this.organizationId = organizationId
    return this.result
  }
}

export class AddProjectSpy implements AddProject {
  params: AddProject.Params

  async add (project: AddProject.Params): Promise<void> {
    this.params = project
  }
}

export class AddProjectMembersSpy implements AddProjectMembers {
  params: AddProjectMembers.Params

  async add (params: AddProjectMembers.Params): Promise<void> {
    this.params = params
  }
}

export class CheckProjectMemberSpy implements CheckProjectMember {
  params: CheckProjectMember.Params
  result = false

  async checkMember (params: CheckProjectMember.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}

export class LoadProjectByIdSpy implements LoadProjectById {
  id: string
  result = mockProjectModelWithMembers()

  async loadById (projectId: string): Promise<LoadProjectById.Result> {
    this.id = projectId
    return this.result
  }
}

export class EditProjectSpy implements EditProject {
  params: AddProject.Params

  async edit (project: AddProject.Params): Promise<void> {
    this.params = project
  }
}
