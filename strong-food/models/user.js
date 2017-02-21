const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  email      : String,
  username   : String,
  password   : String,
  heigth     : String,
  weight     : String,
  genere     : String,
  birthday   : Date,
  recipesSaved    : Array,
  recipesDone     : Array,
  recipesCreated  : Array,
  imgUrl     : { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250" }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
