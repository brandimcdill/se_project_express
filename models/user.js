const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { ERROR_TYPES } = require("../utils/error");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required."],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
      type: String,
      required: true,
      unique: true
    },
  password: {
      type: String,
      required: true,
      minlength: 8
    }

});

userSchema.statics.findUserByCredentials = function findUSerByCredentials (email, password) {
  return this.findOne({email})
  .then(user => {
    //we get the user object if the email and password match
    if (!user) {
      return Promise.reject(new Error('Incorrect email or password'));
    }
    return bcrypt.compare(password, user.password);
  })
    .then((matched) => {
      if (!matched) {
        return Promis.reject(new Error('Incorrect email or password'));
      }
      return user;
  })
};

module.exports = mongoose.model('user', userSchema);
