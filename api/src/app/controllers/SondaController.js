const SondasRepositories = require('../repositories/SondaRepositories')
const UserRepositories = require('../repositories/UsersRepositories')
const isValidUUID = require('../utils/isValidUUID')

class SondaController {

    //List all sondas
    async index(request, response) {
        const sondas = await SondasRepositories.findAll()
        response.json(sondas)
    }

    //Show a base
    async show(request, response) {
        const { id } = request.params

        if (!isValidUUID(id)) {
            return response.status(400).json({ error: "Invalid category ID" });
        }

        const base = await SondasRepositories.findById(id)

        if (!base) {
            return response.status(404).json({ error: 'Sonda não encontrada' })
        }
        response.json(base)
    }

    //Create a base
    async store(request, response) {
        const { name } = request.body

        if (!name) {
            return response.status(404).json({ error: "Nome é obrigatório!" });
        }

        const sondaNameExists = await SondasRepositories.findByName(name)

        if (sondaNameExists) {
            return response.status(404).json({ error: "Nome já existe!" })
        }


        const base = await SondasRepositories.create(name)

        response.json(base)
    }

    async update(request, response) {

        const { id } = request.params
        const { name } = request.body


        if (!name) {
            return response.status(404).json({ error: "Name is required!" });
        }

        if (!isValidUUID(id)) {
            return response.status(400).json({ error: "Invalid category ID" });
        }

        const sondaExists = await SondasRepositories.findById(id)

        if (!sondaExists) {
            return response.status(404).json({ error: 'Base não encontrada.' })
        }

        const sondaNameExists = await SondasRepositories.findByName(name)

        if (sondaNameExists) {
            return response.status(404).json({ error: 'Noma já existe!' })
        }

        const updatedSonda = await SondasRepositories.update(id, { name })

        response.json(updatedSonda)
    }

    async delete(request, response) {
        const { id } = request.params

        await SondasRepositories.delete(id)
        response.sendStatus(204);
    }

}

module.exports = new SondaController();