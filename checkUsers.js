// checkUsers.js
import mongoose from 'mongoose';
import User from './models/user.js';

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(async () => {
    const users = await User.find({}).select('+password');
    console.log(JSON.stringify(users, null, 2));
    process.exit();
  })
  .catch(console.error);
  