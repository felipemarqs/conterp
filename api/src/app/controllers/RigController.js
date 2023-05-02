const RigsRepositories = require("../repositories/RigsRepositories");
const UserRepositories = require("../repositories/UsersRepositories");
const isValidUUID = require("../utils/isValidUUID");

class RigController {
  //List all rigs
  async index(request, response) {
    const rigs = await RigsRepositories.findAll();
    response.json(rigs);
  }

  //Show a base
  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Invalid category ID" });
    }

    const base = await RigsRepositories.findById(id);

    if (!base) {
      return response.status(404).json({ error: "rig não encontrada" });
    }
    response.json(base);
  }

  //Create a base
  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(404).json({ error: "Nome é obrigatório!" });
    }

    const rigNameExists = await RigsRepositories.findByName(name);

    if (rigNameExists) {
      return response.status(404).json({ error: "Nome já existe!" });
    }

    const rig = await RigsRepositories.create(name);

    response.status(201).json(rig);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!name) {
      return response.status(404).json({ error: "Name is required!" });
    }

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Invalid category ID" });
    }

    const rigExists = await RigsRepositories.findById(id);

    if (!rigExists) {
      return response.status(404).json({ error: "Base não encontrada." });
    }

    const rigNameExists = await RigsRepositories.findByName(name);

    if (rigNameExists) {
      return response.status(404).json({ error: "Noma já existe!" });
    }

    const updatedrig = await RigsRepositories.update(id, { name });

    response.json(updatedrig);
  }

  async delete(request, response) {
    const { id } = request.params;

    await RigsRepositories.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new RigController();
