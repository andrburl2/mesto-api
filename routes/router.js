const router = require('express').Router();
const { validateSignup, validateSignin } = require('../assets/joi-schemes');

const { singup, signin, logout } = require('../controllers/auth');
const users = require('./users.js');
const cards = require('./cards.js');
const sendError = require('./error.js');


router.post('/signup', validateSignup, singup);
router.post('/signin', validateSignin, signin);
router.post('/logout', logout);

router
  .use('/users', users)
  .use('/cards', cards)
  .use('*', sendError);

module.exports = router;