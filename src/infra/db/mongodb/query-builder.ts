export class QueryBuilder {
  private readonly query = []

  private addStep (step: string, data: object): QueryBuilder {
    this.query.push({
      [step]: data
    })
    return this
  }

  match (data: object): QueryBuilder {
    return this.addStep('$match', data)
  }

  lookup (data: object): QueryBuilder {
    return this.addStep('$lookup', data)
  }

  project (data: object): QueryBuilder {
    return this.addStep('$project', data)
  }

  addFields (data: object): QueryBuilder {
    return this.addStep('$addFields', data)
  }

  build (): object[] {
    return this.query
  }
}
