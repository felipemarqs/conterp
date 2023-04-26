import HttpClient from "./utils/HttpClient";

class SondasServices {
    constructor() {
        this.HttpClient = new HttpClient("http://localhost:3001");
    }

    async listSondas() {
        const sondas = await this.HttpClient.get(`/sondas`);

        console.log("sondas no http", sondas);

        return sondas;
    }
}

export default new SondasServices();