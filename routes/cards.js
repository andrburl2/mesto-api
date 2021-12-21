const cardRouter = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
const { validateCard, validateObjectId } = require('../assets/joi-schemes');

cardRouter.get('/', getCards);
cardRouter.post('/', validateCard, createCard);
cardRouter.delete('/:cardId', validateObjectId, deleteCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardRouter;