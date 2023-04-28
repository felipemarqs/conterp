import HttpClient from "./utils/HttpClient";

class EfficienciesServices {
    constructor() {
        this.HttpClient = new HttpClient("http://localhost:3001");
    }

    async listEfficiencies() {
        const efficiencies = await this.HttpClient.get(`/efficiencies`);

        console.log("Efficiencies no http", efficiencies);

        return efficiencies;
    }
}

export default new EfficienciesServices();