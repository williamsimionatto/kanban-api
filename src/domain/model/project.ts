export type ProjectModel = {
  id: string
  name: string
  description: string
  startDate: Date
  endDate: Date
  organizationId: string
  members: Member[] | null
}

type Member = {
  id: string
  name: string
  email: string
  organizationId: string
  active: boolean
}
