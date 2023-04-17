const BasesRepositories = require('../repositories/BasesRepositories')
const isValidUUID = require('../utils/isValidUUID')

class BaseController {

    //List all bases
    async index(request, response) {
        const bases = await BasesRepositories.findAll()
        response.json(bases)
    }

    //Show a base
    async show(request, response) {
        const { id } = request.params

        if (!isValidUUID(id)) {
            return response.status(400).json({ error: "Invalid category ID" });
        }

        const base = await BasesRepositories.findById(id)

        if (!base) {
            return response.status(404).json({ error: 'Base não encontrada' })
        }
        response.json(base)
    }

    //Create a base
    async store(request, response) {
        const { name, user_id } = request.body

        if (!name) {
            return response.status(404).json({ error: "Name is required!" });
        }

        if (!isValidUUID(user_id)) {
            return response.status(400).json({ error: "Invalid user ID" });
        }

        const base = await BasesRepositories.create({ name, user_id })

        response.json(base)
    }

    async update(request, response) {

        const { id } = request.params
        const { name, user_id } = request.body


        if (!name) {
            return response.status(404).json({ error: "Name is required!" });
        }

        if (!isValidUUID(id)) {
            return response.status(400).json({ error: "Invalid category ID" });
        }

        const baseExists = await BasesRepositories.findById(id)

        if (!baseExists) {
            return response.status(404).json({ error: 'Base não encontrada.' })
        }

        const baseNameExists = await BasesRepositories.findByName(name)

        if (baseNameExists) {
            return response.status(404).json({ error: 'Noma já existe!' })
        }

        if (!isValidUUID(user_id)) {
            return response.status(400).json({ error: "Invalid user ID" });
        }

        const updatedBase = await BasesRepositories.update(id, { name, user_id })

        response.json(updatedBase)
    }

    async delete(request, response) {
        await BasesRepositories.delete(id)
        response.sendStatus(204);
    }

}

module.exports = new BaseController();