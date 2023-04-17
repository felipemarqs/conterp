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
            return response.status(400).json({ error: "Invalid category ID" });
        }

        const base = await BasesRepositories.create({ name, user_id })

        response.json(base)
    }


}

module.exports = new BaseController();