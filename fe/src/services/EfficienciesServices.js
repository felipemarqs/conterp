import APIError from "../errors/APIError";
import HttpClient from "./utils/HttpClient";

class EfficienciesServices {
    constructor() {
        this.HttpClient = new HttpClient("http://localhost:3001");
    }

    async listEfficiencies() {
        const efficiencies = await this.HttpClient.get(`/efficiencies`);

        return efficiencies;
    }

    async listEfficienciesByRigId(id) {

        const efficiencies = await this.HttpClient.get(`/efficiencies-rig/${id}`)
        return efficiencies;
    }

    async createEfficiency({
        date,
        rig_id,
        user_id,
        available_hours,
        repair_hours,
        has_gloss_hours,
        end_time_gloss,
        start_time_gloss,
        gloss_classification,
        gloss_sub_category,
        dtm_hours
    }) {

        /* if (!rig_id) {
            throw new APIError({ error: "O usuário deve ser vinculado à uma sonda!" })
        } */

        const body = {
            date,
            rig_id,
            user_id,
            available_hours,
            repair_hours,
            has_gloss_hours,
            end_time_gloss,
            start_time_gloss,
            gloss_classification,
            gloss_sub_category,
            dtm_hours
        }
        const efficiency = await this.HttpClient.post(`/efficiencies`, { body: body })

        return efficiency;
    }
}

export default new EfficienciesServices();