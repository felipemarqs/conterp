const db = require("../../database/index")
class BasesRepositories {

    async findAll() {
        const [rows] = await db.query(`SELECT * FROM bases`)

        return rows
    }

    async findById(id) {
        const [row] = await db.query(`SELECT * FROM bases WHERE id = $1`, [id])
        return row
    }

    async findByName(name) {
        const [row] = await db.query(`SELECT * FROM bases WHERE name = $1`, [name])
        return row
    }


    async create({ name, user_id }) {
        const [row] = await db.query(
            `INSERT INTO bases (name, user_id)
            VALUES($1, $2)
            RETURNING *
            `, [name, user_id])
        return row
    }

    async update(id, { name, user_id }) {
        const [row] = await db.query(`
        UPDATE bases
        SET name = $1, user_id = $2
        WHERE id = $3
        RETURNING *
        `, [name, user_id, id])

        return row
    }
}

module.exports = new BasesRepositories();