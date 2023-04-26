const db = require("../../database/index")
class SondasRepositories {

    async findAll() {
        const rows = await db.query(`SELECT * FROM Sondas`)

        return rows
    }

    async findById(id) {
        const [row] = await db.query(`SELECT * FROM Sondas WHERE id = $1`, [id])
        return row
    }

    async findByName(name) {
        const [row] = await db.query(`SELECT * FROM Sondas WHERE name = $1`, [name])
        return row
    }


    async create(name) {
        const [row] = await db.query(
            `INSERT INTO Sondas (name)
            VALUES($1)
            RETURNING *
            `, [name])
        return row
    }

    async update(id, { name }) {
        const [row] = await db.query(`
        UPDATE Sondas
        SET name = $1
        WHERE id = $2
        RETURNING *
        `, [name, id])

        return row
    }

    async delete(id) {
        const deleteOp = await db.query('DELETE FROM Sondas WHERE id = $1', [id])
        return deleteOp
    }
}

module.exports = new SondasRepositories();