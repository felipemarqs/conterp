const db = require('../../database')

class UsersRepositories {
    async findAll(orderBy = 'ASC') {

        const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : 'ASC'
        const rows = await db.query(`SELECT * FROM users ORDER BY email ${direction}`)
        return rows
    }

    async findById(id) {
        const [row] = await db.query('SELECT * FROM users WHERE id = $1', [id])
        return row
    }

    async findByEmail(email) {
        const [row] = await db.query('SELECT * FROM users WHERE email = $1', [email])
        return row
    }

    async create({ email, password_hash, access_level }) {
        const [row] = await db.query(
            `INSERT INTO users(email, password, access_level)
            VALUES($1,$2,$3)
            RETURNING *
            `, [email, password_hash, access_level])

        return row;
    }

    async update(id, { email, passwordHash, access_level }) {
        const [row] = await db.query(`
        UPDATE users
        SET email = $1, password = $2, access_level = $3 
        WHERE id = $4
        RETURNING *
       `, [email, passwordHash, access_level, id])
        return row
    }

    async delete(id) {
        const deleteOp = await db.query('DELETE FROM users WHERE id = $1', [id]);
        return deleteOp
    }
}

module.exports = new UsersRepositories()