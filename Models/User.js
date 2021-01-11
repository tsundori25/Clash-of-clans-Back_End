const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  townhall: {
    type: String,
    required: true
  },
  resource: {
    golds: {
      max: 1000,
      type: Number
    },
    foods: {
      max: 1000,
      type: Number
    },
    soldier: {
      max: 500,
      type: Number
    }
  }
});

userSchema.pre('save', function (next) {
  User.findOne({
      email: this.email
    })
    .then((user) => {
      if (user) next({
        name: 'EMAIL ALREADY EXISTS'
      });
      else {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
        next();
      }
    })
    .catch((error) => next({
      name: 'ERROR!'
    }));
});

const User = mongoose.model('User', userSchema);

module.exports = User;