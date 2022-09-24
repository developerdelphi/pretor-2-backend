import '../config/module-alias'
import express from 'express'
import { AddPersona } from '@/application/usecases/add-persona'
import { InputPersonaData } from '@/domain/protocols'
import DatabaseRepositoyFactory from '@/infra/factory/database-repository-factory'

const app = express()
app.use(express.json())
const repositoryFactory = new DatabaseRepositoyFactory()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/persona', async function (req, res) {
  const addPersona = new AddPersona(repositoryFactory)
  const input: InputPersonaData = {
    name: req.body.name,
    kind: req.body.kind
  }
  const output = await addPersona.execute(input)
  res.end(output)
})

app.listen(3000)
