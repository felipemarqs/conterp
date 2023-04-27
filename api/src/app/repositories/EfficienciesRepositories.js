const db = require("../../database/index")

class EfficienciesRepositories {

    async findAll() {
        const rows = await db.query(`SELECT * FROM efficiencies`)

        return rows
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

}

module.exports = new EfficienciesRepositories();
