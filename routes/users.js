const userRouter = require('express').Router();
const { validateEditProfile } = require('../assets/joi-schemes');
const { getProfile, editProfile } = require('../controllers/users');

userRouter.get('/', getProfile);
userRouter.patch('/me', validateEditProfile, editProfile);

module.exports = userRouter;