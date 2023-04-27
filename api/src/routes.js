const { Router } = require('express')

const UserController = require('./app/controllers/UserController')
const RigController = require('./app/controllers/RigController');
const EfficiencyController = require('./app/controllers/EfficiencyController')

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
router.get('/rigs', RigController.index)
router.get('/rigs/:id', RigController.show)
router.post('/rigs', RigController.store)
router.put('/rigs/:id', RigController.update)
router.delete('/rigs/:id', RigController.delete)

//
router.get('/efficiency', EfficiencyController.index)
router.post('/efficiency', EfficiencyController.store)



module.exports = router;