const db = require("../../database/index")
class RigsRepositories {

    async findAll() {
        const rows = await db.query(`SELECT * FROM rigs`)

        return rows
    }

    async findById(id) {
        const [row] = await db.query(`SELECT * FROM rigs WHERE id = $1`, [id])
        return row
    }

    async findByName(name) {
        const [row] = await db.query(`SELECT * FROM rigs WHERE name = $1`, [name])
        return row
    }


    async create(name) {
        const [row] = await db.query(
            `INSERT INTO rigs (name)
            VALUES($1)
            RETURNING *
            `, [name])
        return row
    }

    async update(id, { name }) {
        const [row] = await db.query(`
        UPDATE rigs
        SET name = $1
        WHERE id = $2
        RETURNING *
        `, [name, id])

        return row
    }

    async delete(id) {
        const deleteOp = await db.query('DELETE FROM rigs WHERE id = $1', [id])
        return deleteOp
    }
}

module.exports = new RigsRepositories();