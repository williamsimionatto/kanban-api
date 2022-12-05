export class CheckOrganizationById implements CheckOrganizationById {
  id: string
  result = true

  async checkById (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}
