import { PersonaModel } from '@/domain/models/persona'
import { InputPersonaData } from '@/domain/protocols/persona-protocols'
import { IAddPersona } from '@/application/protocols'
import { AddPersonaController } from '@/presentation/controllers/persona/add-persona'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { NameValidator } from '@/presentation/protocols'

interface SutTypes {
  sut: AddPersonaController
  nameValidatorStub: NameValidator
  addPersonaStub: IAddPersona
}

const makeNameValidator = (): NameValidator => {
  class NameValidatorStub implements NameValidator {
    isValid (name: string): boolean {
      if (!name) return false
      // if (name.trim().length >= 5) return true
      return true
    }
  }
  return new NameValidatorStub()
}

const makeAddPersona = (): IAddPersona => {
  class AddPersonaStub implements IAddPersona {
    async add (insert: InputPersonaData): Promise<PersonaModel> {
      const fakePersona = {
        persona_id: 'valid_id',
        name: 'valid_name',
        kind: 'valid_kind'
      }
      return await new Promise(resolve => resolve(fakePersona))
    }
  }
  return new AddPersonaStub()
}

const existsRequiredFields = (bodyRequest: any, requiredFields: any): boolean => {
  if (!bodyRequest || !requiredFields) return false

  const verification = (verify: any, requiredFields: any): boolean => {
    if (!verify) return false
    const isArray = (verify instanceof Array)

    if (!isArray) {
      for (let i = 0; i < requiredFields.length; i++) {
        if (!(requiredFields[i] in verify)) return false
      }
      return true
    }

    for (const field of verify) {
      for (let i = 0; i < requiredFields.length; i++) {
        if (!(requiredFields[i] in field)) return false
      }
    }
    return true
  }

  if (!verification(bodyRequest, requiredFields.persona)) return false

  if (bodyRequest.address) {
    if (!verification(bodyRequest.address, requiredFields.address)) return false
    return true
  }
  if (bodyRequest.phone) {
    if (!verification(bodyRequest.phone, requiredFields.phone)) return false
  }

  if (bodyRequest.document) {
    if (!verification(bodyRequest.document, requiredFields.document)) return false
  }
  if (bodyRequest.qualification) {
    if (!verification(bodyRequest.qualification, requiredFields.qualification)) return false
  }
  return true
}

const makeSut = (): SutTypes => {
  const nameValidatorStub = makeNameValidator()
  const addPersonaStub = makeAddPersona()
  const sut = new AddPersonaController(nameValidatorStub, addPersonaStub)

  return { sut, nameValidatorStub, addPersonaStub }
}

describe('AddPersona Controller', () => {
  test('Deve retornar true todos os campos requeridos forem informados na Request.body', async () => {
    // const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        kind: 'valid_kind',
        address: [{
          street: 'rua',
          number: '1',
          complement: 'q',
          district: 'centro',
          city: 'city',
          uf: 'go',
          cep: 'cep'
        }],
        phone: [{ number: '123' }],
        document: [{ kind: 'algo', identifier: '123' }],
        qualification: [{ sort: 'algo', qualify: 'algo' }]

      }
    }
    const requiredFields = {
      persona: ['name', 'kind'],
      address: ['street', 'district', 'city', 'uf', 'cep'],
      phone: ['number'],
      document: ['kind', 'identifier'],
      qualification: ['sort', 'qualify']

    }
    // console.log(requiredFields)
    expect(existsRequiredFields(httpRequest.body, requiredFields)).toBeTruthy()
    // const httpResponse = await sut.handle(httpRequest)
    // expect(httpResponse.statusCode).toBe(333)
    // expect(httpResponse.body).toBeInstanceOf(ServerError)
  })

  test('Deve retornar 400 se não recebeu parâmetro name', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        cpf: 'valid_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.data).toBeInstanceOf(MissingParamError)
  })

  test('Deve retornar 400 se recebeu dados inválidos para parâmetro name', async () => {
    const { sut, nameValidatorStub } = makeSut()
    jest.spyOn(nameValidatorStub, 'isValid').mockReturnValue(false)
    const httpRequest = {
      body: {
        name: ''
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.data).toBeInstanceOf(MissingParamError)
  })

  test('Deve garantir que chamou o NameValidator com o nome correto', async () => {
    const { sut, nameValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(nameValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_name')
  })

  test('Deve retornar 500 se NameValidator retornar erro', async () => {
    const { sut, nameValidatorStub } = makeSut()
    jest.spyOn(nameValidatorStub, 'isValid').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toBeInstanceOf(ServerError)
  })

  test('Deve chamar AddPersona com valores corretos', async () => {
    const { sut, addPersonaStub } = makeSut()
    const addSpy = jest.spyOn(addPersonaStub, 'add')
    const httpRequest = {
      body: { name: 'valid_name' }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({ name: 'valid_name' })
  })

  test('Deve retornar 500 se AddPersona retornar erro', async () => {
    const { sut, addPersonaStub } = makeSut()
    jest.spyOn(addPersonaStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toBeInstanceOf(ServerError)
  })

  test('Deve retornar 200 se validou os dados do request', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        kind: 'valid_kind'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.data).toEqual({
      persona_id: 'valid_id',
      name: 'valid_name',
      kind: 'valid_kind'
    })
  })
})
