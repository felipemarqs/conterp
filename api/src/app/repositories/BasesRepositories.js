const db = require("../../database/index")
class BasesRepositories {

    async findAll() {

        const [rows] = await db.query(`SELECT * FROM bases`)

        return rows
    }


    async create({ name, user_id }) {
        const [row] = await db.query(
            `INSERT INTO bases (name, user_id)
            VALUES($1, $2)
            RETURNING *
            `, [name, user_id])
        return row
    }
}

module.exports = new BasesRepositories();