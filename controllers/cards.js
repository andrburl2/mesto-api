const Card = require('../models/card');

const { Forbidden, NotFound } = require('../assets/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { title, link } = req.body;

  Card.create({ title, link, owner: req.user._id })
    .then((card) => res.status(201).send({
      status: 201,
      card,
    }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (req.user._id.toString() === card.owner.toString()) {
          Card.deleteOne(card)
            .then(() => res.status(200).send({ message: 'Карточка успешно удалена' }));
        } else {
          throw new Forbidden('Нельзя удалить чужую карточку');
        }
      } else {
        throw new NotFound('Не удается найти карточку');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then(card => res.status(200).send({ card: card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next ) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then(card => res.status(200).send({ card: card }))
    .catch(next);
};