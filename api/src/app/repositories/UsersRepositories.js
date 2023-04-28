const db = require('../../database')

class UsersRepositories {
    async findAll(orderBy = 'ASC') {

        const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : 'ASC'
        const rows = await db.query(`
            SELECT users.* , rigs.name AS rig_name
            FROM users
            LEFT JOIN rigs ON rigs.id = users.rig_id
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
            SELECT users.* , rigs.name AS rig_name, rigs.id AS rig_id 
            FROM users
            LEFT JOIN rigs ON rigs.id = users.rig_id
            WHERE email = $1`, [email])
        return row
    }

    async create({ name, email, password_hash, access_level, rig_id }) {
        const [row] = await db.query(
            `INSERT INTO users(name ,email, password, access_level, rig_id)
            VALUES($1,$2,$3,$4,$5)
            RETURNING *
            `, [name, email, password_hash, access_level, rig_id])

        return row;
    }

    async update(id, { name, email, passwordHash, access_level, rig_id }) {
        const [row] = await db.query(`
        UPDATE users
        SET name = $1, email = $2, password = $3, access_level = $4 rig_id = $5
        WHERE id = $6
        RETURNING *
       `, [name, email, passwordHash, access_level, rig_id, id])
        return row
    }

    async delete(id) {
        const deleteOp = await db.query('DELETE FROM users WHERE id = $1', [id]);
        return deleteOp
    }
}

module.exports = new UsersRepositories()