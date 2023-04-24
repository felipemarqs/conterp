//Configurando o CORS da aplicação, setamos os Headers da requisição para aceitar origens diferentes da do Servidor
module.exports = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Max-Age", "60");
    next();
  };
  