const db = require('../../database')

class UsersRepositories {
    async findAll(orderBy = 'ASC') {

        const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : 'ASC'
        const rows = await db.query(`
            SELECT users.* , sondas.name AS sonda_name
            FROM users
            LEFT JOIN sondas ON sondas.id = users.sonda_id
            ORDER BY users.name ${direction}
            `)
        return rows
    }

    async findById(id) {
        const [row] = await db.query('SELECT * FROM users WHERE id = $1', [id])
        return row
    }

    async findByEmail(email) {
        const [row] = await db.query(`
            SELECT users.* , sondas.name AS sonda_name 
            FROM users
            LEFT JOIN sondas ON sondas.id = users.sonda_id
            WHERE email = $1`, [email])
        return row
    }

    async create({ name, email, password_hash, access_level, sonda_id }) {
        const [row] = await db.query(
            `INSERT INTO users(name ,email, password, access_level, sonda_id)
            VALUES($1,$2,$3,$4,$5)
            RETURNING *
            `, [name, email, password_hash, access_level, sonda_id])

        return row;
    }

    async update(id, { name, email, passwordHash, access_level, sonda_id }) {
        const [row] = await db.query(`
        UPDATE users
        SET name = $1, email = $2, password = $3, access_level = $4 sonda_id = $5
        WHERE id = $6
        RETURNING *
       `, [name, email, passwordHash, access_level, sonda_id, id])
        return row
    }

    async delete(id) {
        const deleteOp = await db.query('DELETE FROM users WHERE id = $1', [id]);
        return deleteOp
    }
}

module.exports = new UsersRepositories()