const { v4 } = require('uuid')

const db = require('../../database')
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

    async create({ email, password_hash, access_level }) {
        const [row] = await db.query(
            `INSERT INTO users(email, password, access_level)
            VALUES($1,$2,$3)
            RETURNING *
            `, [email, password_hash, access_level])

        return row;
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