const Card = require('../models/card');
const NotFoundError = require('../middlewares/errors/NotFoundError');
const AuthorizationError = require('../middlewares/errors/AuthorizationError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      }
      if (req.user._id.toString() !== card.owner.toString()) {
        throw new AuthorizationError('You Are Not Authorized To Delete This Card');
      }
      return Card.remove(card).then(() => { res.send({ data: card }); });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        throw new NotFoundError('Card not found');
      }
    })
    .catch(next);
};

const unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        throw new NotFoundError('Card not found');
      }
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCardById, likeCard, unlikeCard,
};
