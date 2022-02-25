const express = require('express');
const router = express.Router();

const { weatherController } = require('../controller/weatherController');

router.get('/details/:city', weatherController);

module.exports = router;