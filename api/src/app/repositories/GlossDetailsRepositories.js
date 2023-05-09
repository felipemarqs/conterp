const db = require("../../database/index")
class GlossDetailsRepositories {

    async findAll() {
        const rows = await db.query(`SELECT * FROM gloss_details`)

        return rows
    }

    async findById(id) {
        const [row] = await db.query(`SELECT * FROM gloss_details WHERE id = $1`, [id])
        return row
    }

    async findByName(name) {
        const [row] = await db.query(`SELECT * FROM gloss_details WHERE name = $1`, [name])
        return row
    }


    async create(
        { start_time_gloss,
            end_time_gloss,
            gloss_classification,
            gloss_sub_category }) {

        /*    const [row] = await db.query(
               `INSERT INTO gloss_details (start_hour, end_hour, classification, sub_category)
                        VALUES (to_timestamp($1, 'YYYY-MM-DD"T"HH24:MI:SS.USZ'), to_timestamp($2, 'YYYY-MM-DD"T"HH24:MI:SS.USZ'), $3, $4)
                       RETURNING *
                   `, [start_time_gloss, end_time_gloss, gloss_classification, gloss_sub_category]); */

        const [row] = await db.query(
            `INSERT INTO gloss_details (start_hour, end_hour, classification, sub_category)
             VALUES ($1,$2,$3,$4)
            RETURNING *
            `, [start_time_gloss, end_time_gloss, gloss_classification, gloss_sub_category])
        return row
    }

    async update(id, { name }) {
        const [row] = await db.query(`
        UPDATE gloss_details
        SET name = $1
        WHERE id = $2
        RETURNING *
        `, [name, id])

        return row
    }

    async delete(id) {
        const deleteOp = await db.query('DELETE FROM gloss_details WHERE id = $1', [id])
        return deleteOp
    }
}

module.exports = new GlossDetailsRepositories();