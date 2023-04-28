const EfficienciesRepositories = require("../repositories/EfficienciesRepositories")
const RigsRepositories = require("../../app/repositories/RigsRepositories")
const UsersRepositories = require("../../app/repositories/UsersRepositories")
const isValidUUID = require("../utils/isValidUUID")

class EfficiencyController {
    async index(request, response) {
        const efficiency = await EfficienciesRepositories.findAll()
        response.json(efficiency)
    }

    async store(request, response) {
        const {
            date,
            rig_id,
            user_id,
            gloss_hours,
            available_hours,
            repair_hours,
            dtm_hours
        } = request.body

        if (!date || !rig_id || !user_id || !gloss_hours || !available_hours || !repair_hours || !dtm_hours) {
            return response.status(404).json({ error: "Todos os campos são obrigatórios!" });
        }

        const efficiencyDayAlreadyExists = await EfficienciesRepositories.findByDate({ rig_id, date })

        if (efficiencyDayAlreadyExists) {
            return response.status(404).json({ error: "Data já preenchida" });

        }

        if (!isValidUUID(rig_id) || !isValidUUID(user_id)) {
            return response.status(404).json({ error: "IDs Inválidos!" });

        }

        const rigExists = await RigsRepositories.findById(rig_id)

        if (!rigExists) {
            return response.status(404).json({ error: 'Base não encontrada.' })
        }

        const userIdExists = await UsersRepositories.findById(user_id);

        if (!userIdExists) {
            return response.status(404).json({ error: "Usuário não encontrado." });
        }

        const efficiency = await EfficienciesRepositories.create({
            date,
            rig_id,
            user_id,
            gloss_hours,
            available_hours,
            repair_hours,
            dtm_hours
        })

        response.status(201).json(efficiency)
    }

    async show(request, response) { }

    async update(request, response) {
        const { id } = request.params

        const { date, gloss_hours, available_hours, repair_hours, dtm_hours } = request.body

        if (!date || !gloss_hours || !available_hours || !repair_hours || !dtm_hours) {
            return response.status(404).json({ error: "Todos os campos são obrigatórios!" });
        }

        const updatedEfficiency = await EfficienciesRepositories.update(id, { date, gloss_hours, available_hours, repair_hours, dtm_hours })

        response.status(200).json(updatedEfficiency);

    }

    async delete(request, response) {

        const { id } = request.params;

        await EfficienciesRepositories.delete(id);

        response.sendStatus(204);

    }
}
module.exports = new EfficiencyController();

