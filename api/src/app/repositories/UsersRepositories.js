const { v4 } = require('uuid')
let users = [
    {
        id: v4(),
        email: 'felipe@email.com',
        password: '123',
        accessLevel: 'user'
    },
    {
        id: v4(),
        email: 'user1@test.com',
        password: 'password123',
        accessLevel: 'user'
    }
]



class UsersRepositories {

    findAll() {
        return new Promise((resolve) => {
            resolve(users)
        })
    }

    findById(id) {
        return new Promise((resolve, reject) => resolve(
            users.find((user) => user.id === id)
        ))
    }

    findByEmail(email) {
        return new Promise((resolve, reject) => resolve(
            users.find((user) => user.email === email)
        ))
    }

    delete(id) {
        return new Promise((resolve) => {
            users = users.filter((user) => user.id !== id)
            resolve()
        })
    }

    create({ email, passwordHash, access_level }) {
        return new Promise((resolve) => {

            const newUser = {
                id: v4(),
                email,
                password: passwordHash,
                access_level
            }

            users.push(newUser)
            resolve(newUser)
        })
    }

    update(id, { email, passwordHash, access_level }) {
        return new Promise((resolve) => {

            const updatedUser = {
                id,
                email,
                password: passwordHash,
                access_level
            }

            users = users.map((user) => (
                user.id === id ? updatedUser : user
            ))

            resolve(updatedUser)
        })
    }


}

module.exports = new UsersRepositories()