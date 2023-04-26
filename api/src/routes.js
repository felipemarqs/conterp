const { Router } = require('express')

const UserController = require('./app/controllers/UserController')
const SondaController = require('./app/controllers/SondaController');
const verifyToken = require('./app/middlewares/verifyToken');

const router = Router();

// User Routes
router.get('/users/', UserController.index)
router.get('/users/:id', verifyToken, UserController.show)
router.delete('/users/:id', UserController.delete)
router.post('/users/', UserController.store)
router.post('/users/login', UserController.login)
router.put('/users/:id', UserController.update)

// Base Routes
router.get('/sondas', SondaController.index)
router.get('/sondas/:id', SondaController.show)
router.post('/sondas', SondaController.store)
router.put('/sondas/:id', SondaController.update)
router.delete('/sondas/:id', SondaController.delete)




module.exports = router;