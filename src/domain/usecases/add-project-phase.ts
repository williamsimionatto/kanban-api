export interface AddProjectPhase {
  add: (data: AddProjectPhase.Params) => Promise<void>
}

export namespace AddProjectPhase {
  export type Params = {
    projectId: string
    name: string
    description: string
    order: number
    type: PhaseType
  }
}

export type PhaseType = 'BACKLOG' | 'TODO' | 'DOING' | 'BLOCKED' | 'REVIEW' | 'DONE'
