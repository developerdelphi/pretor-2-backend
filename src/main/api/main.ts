import '../config/module-alias'
import express, { NextFunction, Request, Response } from 'express'
import { InputPersonaData } from '@/domain/protocols'
import DatabaseRepositoryFactory from '@/infra/factory/database-repository-factory'
import { AddPersonaUseCase } from '@/application/usecases/add-persona'

const app = express()
app.use(express.json())
const repositoryFactory = new DatabaseRepositoryFactory()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/persona', async function (req: Request, res: Response) {
  const addPersona = new AddPersonaUseCase(repositoryFactory)
  const input: InputPersonaData = {
    name: req.body.name,
    kind: req.body.kind,
    address: req.body.address,
    phone: req.body.phone,
    document: req.body.document,
    qualification: req.body.qualification
  }
  const resp = await addPersona.execute(input)
  const status = resp.isRight() ? 200 : 500

  res.status(status).json(resp.value)
})

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setTimeout(5000, () => {
    res.send(408)
  })
  next()
})

app.listen(3000)
