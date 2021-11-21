const mongoose = require('mongoose');
// const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../middlewares/errors/AuthorizationError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator(v) {
    //     return validator.isEmail(v);
    //   },
    //   message: 'Please enter a valid email address',
    // },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    // validate: {
    //   validator(v) {
    //     return validator.isURL(v);
    //   },
    //   message: 'Please enter a valid link',
    // },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError('Incorrect email or password');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthorizationError('Incorrect email or password');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
