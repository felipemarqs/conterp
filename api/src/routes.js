const { Router } = require('express')

const UserController = require('./app/controllers/UserController')
const BaseController = require('./app/controllers/BaseController');

const router = Router();

// User Routes
router.get('/users/', UserController.index)
router.get('/users/:id', UserController.show)
router.delete('/users/:id', UserController.delete)
router.post('/users/', UserController.store)
router.post('/users/login', UserController.login)
router.put('/users/:id', UserController.update)

// Base Routes
router.get('/bases', BaseController.index)
router.get('/bases/:id', BaseController.show)
router.post('/bases', BaseController.store)
router.put('/bases/:id', BaseController.update)
router.delete('/bases/:id', BaseController.delete)




module.exports = router;