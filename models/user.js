import  mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";


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
      required: [true, "Email is required."],
      unique: true,
      validate: {
        validator(value) {
          if (!value) return false;
          return validator.isEmail(value);
        },
        message: "You must enter a valid email address",
      }
    },
  password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    }

});

userSchema.pre('save', async function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  const User = this;
  return User.findOne({ email }).select('+password')
    .then(user => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }
          return user;
        });
    });
};

export default mongoose.model('user', userSchema);
