const mongoose = require("mongoose");
const validator = require("validator");

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
  .then(user => {
    //we get the user object if the email and password match
  
  })
  .catch(err => {
    //otherwise, we get an error
  })
}

module.exports = mongoose.model('user', userSchema);
