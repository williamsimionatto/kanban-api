import { LoadProjectByIdController } from '../../../../presentation/controllers'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators'
import { makeDbLoadProjectById } from '../../usecases'

export const makeLoadProjectByIdController = (): Controller => {
  const controller = new LoadProjectByIdController(makeDbLoadProjectById())
  return makeLogControllerDecorator(controller)
}
