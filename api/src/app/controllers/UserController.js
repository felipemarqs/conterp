const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const UsersRepositories = require("../repositories/UsersRepositories");

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

class UserController {
  //List all users
  async index(request, response) {
    const { orderBy } = request.query;
    const users = await UsersRepositories.findAll(orderBy);

    response.json(users);
  }

  //Show a user
  async show(request, response) {
    const { id } = request.params;

    const user = await UsersRepositories.findById(id);

    if (!user) {
      return response.status(404).json({ error: "Usuário não encontrado." });
    }

    response.json(user);
  }

  //Create a user
  async store(request, response) {
    const { email, password, access_level } = request.body;

    if (!email) {
      return response.status(400).json({ error: "Email é obrigatório!" });
    }

    if (!password) {
      return response.status(400).json({ error: "Senha é obrigatório!" });
    }

    if (!access_level) {
      return response
        .status(400)
        .json({ error: "Nível de acesso é obrigatório!" });
    }

    const userExists = await UsersRepositories.findByEmail(email);

    if (userExists) {
      return response.status(400).json({ error: "Email já cadastrado!" });
    }

    //Gerar hash da senha
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await UsersRepositories.create({
      email,
      password_hash: passwordHash,
      access_level,
    });

    //Se cadastrado com sucesso retornar o Token
    if (newUser) {
      response
        .status(201)
        .json({
          user: {
            email: newUser.email,
            access_level: newUser.access_level
          },
          token: generateToken(newUser.id)
        });
    }
  }

  //Update a user
  async update(request, response) {
    const { id } = request.params;

    const { email, password, access_level } = request.body;

    //Verifica se existe um usuário com ID
    const userIdExists = await UsersRepositories.findById(id);

    if (!userIdExists) {
      return response.status(404).json({ error: "Usuário não encontrado." });
    }

    //verifica se os campos foram realmente preenchidos
    if (!email) {
      return response.status(400).json({ error: "Email é obrigatório!" });
    }

    if (!password) {
      return response.status(400).json({ error: "Senha é obrigatório!" });
    }

    if (!access_level) {
      return response
        .status(400)
        .json({ error: "Nível de acesso é obrigatório!" });
    }

    const userEmailExists = await UsersRepositories.findByEmail(email);

    if (userEmailExists && userEmailExists.id !== id) {
      return response.status(400).json({ error: "Email já cadastrado!" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const updatedUser = await UsersRepositories.update(id, {
      email,
      passwordHash,
      access_level,
    });

    response.json(updatedUser);
  }

  //Delete a user
  async delete(request, response) {
    const { id } = request.params;

    await UsersRepositories.delete(id);

    response.sendStatus(204);
  }

  async login(request, response) {
    const { email, password } = request.body;

    if (!email) {
      return response.status(400).json({ error: "Email é obrigatório!" });
    }

    if (!password) {
      return response.status(400).json({ error: "Senha é obrigatório!" });
    }

    const user = await UsersRepositories.findByEmail(email);

    //Verificar se o usuário existe
    if (!user) {
      return response.status(404).json({ error: "Usuário não encontrado" });
    }

    //Checar se as senhas conferem

    if (!(await bcrypt.compare(password, user.password))) {
      return response.status(401).json({ error: "Credenciais inválidas" });
    }

    response.status(201).json({
      user: {
        email: user.email,
        access_level: user.access_level
      },
      token: generateToken(user.id),
    });
  }
}

module.exports = new UserController();
