const userRouter = require('express').Router();
const { validateEditProfile, validateEditAvatar } = require('../assets/joi-schemes');
const { getProfile, editProfile, editAvatar } = require('../controllers/users');

userRouter.get('/', getProfile);
userRouter.patch('/me', validateEditProfile, editProfile);
userRouter.patch('/me/avatar', validateEditAvatar, editAvatar);

module.exports = userRouter;