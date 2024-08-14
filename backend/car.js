const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id:{
        type: String,
        required:true,
    },
    desc:{
        type: String,
        required:true,
    },
  name: {
    type: String,
    required: true,
  },
  amount:{
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rating:{
    type:String,
    required:true,
  },
  phone:{
    type:String,
    required:true,
  },
});

module.exports = mongoose.model('CarInfo', UserSchema);
