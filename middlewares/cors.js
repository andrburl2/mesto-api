const router = require('express').Router();
const cors = require('cors');

const corsOptions = {
  origin: ['https://andrburl-mesto.ml', 'https://www.andrburl-mesto.ml'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
  credentials: true,
};

router.use(cors(corsOptions));

module.exports = router;