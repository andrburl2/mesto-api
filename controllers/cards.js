const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Не удается получить карточки' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message || 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .select('+owner')
    .then((card) => {
      if (card) {
        if (req.user._id.toString() === card.owner.toString()) {
          Card.deleteOne(card)
            .then(() => res.status(200).send({ message: 'Карточка успешно удалена' }));
        } else {
          throw new Error('Нельзя удалить чужую карточку');
        }
      } else {
        throw new Error('Не удается найти карточку');
      }
    })
    .catch((err) => res.status(500).send({ message: err.message || 'Произошла ошибка' }))
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(200).send({ card: card }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(200).send({ card: card }));
};