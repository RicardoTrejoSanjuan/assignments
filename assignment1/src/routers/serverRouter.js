const express = require('express');
const router = express.Router();

const { serverController } = require('../controller/serverController');

router.get('/', serverController);

module.exports = router;