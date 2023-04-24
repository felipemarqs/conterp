require("express-async-errors");


//Exportando um errorhandler, ao enviar 4 parametros na função o express já reconhece que o primeiro é um erro.
module.exports = (error, req, res, next) => {
    console.log("########## Error Handler ##########");
    console.log(error);
    res.sendStatus(500);
  }