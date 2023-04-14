const { response } = require('express');
const UsersRepositories = require('../repositories/UsersRepositories')

class UserController {

    //List all users
    async index(request, response) {
        const users = await UsersRepositories.findAll();

        response.json(users)

    }

    //Show a user
    async show(request, response) {

        const { id } = request.params

        const user = await UsersRepositories.findById(id)

        console.log(user)

        if (!user) {
            return response.status(404).json({ error: 'Usuário não encontrado.' })
        }

        response.json(user)
    }

    //Create a user
    async store(request, response) {

        const { email, password, access_level } = request.body

        if (!email) {
            return response.status(400).json({ error: "Email é obrigatório!" })
        }

        if (!password) {
            return response.status(400).json({ error: "Senha é obrigatório!" })
        }

        if (!access_level) {
            return response.status(400).json({ error: "Nível de acesso é obrigatório!" })
        }

        const userExists = await UsersRepositories.findByEmail(email)

        if (userExists) {
            return response.status(400).json({ error: 'Email já cadastrado!' })
        }
        const user = await UsersRepositories.create({ email, password, access_level })



        response.json(user)
    }

    //Update a user
    async update(request, response) {
        const { id } = request.params

        const { email, password, access_level } = request.body

        //Verifica se existe um usuário com ID
        const userIdExists = await UsersRepositories.findById(id)

        console.log("User ID", userIdExists)

        if (!userIdExists) {
            return response.status(404).json({ error: 'Usuário não encontrado.' })
        }

        //verifica se os campos foram realmente preenchidos
        if (!email) {
            return response.status(400).json({ error: "Email é obrigatório!" })
        }

        if (!password) {
            return response.status(400).json({ error: "Senha é obrigatório!" })
        }

        if (!access_level) {
            return response.status(400).json({ error: "Nível de acesso é obrigatório!" })
        }


        const userEmailExists = await UsersRepositories.findByEmail(email)

        console.log("User Email", userEmailExists)

        if (userEmailExists && userEmailExists.id !== id) {
            return response.status(400).json({ error: 'Email já cadastrado!' })
        }

        const user = await UsersRepositories.update(id, {
            email, password, access_level
        })

        response.json(user)
    }

    //Delete a user
    async delete(request, response) {
        const { id } = request.params
        const user = await UsersRepositories.findById(id)

        if (!user) {
            return response.status(404).json({ error: 'Usuário não encontrado.' })
        }

        await UsersRepositories.delete(id)

        response.sendStatus(204);

    }




}

module.exports = new UserController();