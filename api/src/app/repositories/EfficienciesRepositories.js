const db = require("../../database/index")

class EfficienciesRepositories {

    async findAll() {
        const rows = await db.query(`SELECT * FROM efficiencies`)

        return rows
    }

    async update(id, { date, gloss_hours, available_hours, repair_hours, dtm_hours }) {
        const [row] = await db.query(`
        UPDATE efficiencies
        SET date = $1, gloss_hours = $2, available_hours = $3, repair_hours = $4, dtm_hours = $5
        WHERE id = $6
        RETURNING *
        `, [date, gloss_hours, available_hours, repair_hours, dtm_hours, id])

        return row;
    }

    async findByDate({ rig_id, date }) {
        const [row] = await db.query(`
        SELECT * FROM efficiencies
        WHERE rig_id = $1 AND date = $2
        `, [rig_id, date])
        return row
    }

    async create({
        date,
        rig_id,
        user_id,
        gloss_hours,
        available_hours,
        repair_hours,
        dtm_hours
    }) {

        const [row] = await db.query(
            `INSERT INTO efficiencies(
            date,
            rig_id,
            user_id,
            gloss_hours,
            available_hours,
            repair_hours,
            dtm_hours
            )
        VALUES($1,$2,$3,$4,$5,$6,$7)  
        RETURNING *  
        `, [date,
            rig_id,
            user_id,
            gloss_hours,
            available_hours,
            repair_hours,
            dtm_hours
        ])

        return row;

    }

    async delete(id) {
        const deleteOp = await db.query('DELETE FROM efficiencies WHERE id = $1', [id]);
        return deleteOp
    }

}

module.exports = new EfficienciesRepositories();
