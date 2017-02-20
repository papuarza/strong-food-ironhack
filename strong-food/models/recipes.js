const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TYPES    = require('./recipes-types');

const RecipeSchema = new Schema({
  name          : String,
  description   : String,
  ingredients   : Array,
  preparation   : {
                      dificulty : {
                                    type : String,
                                    enum : ["SuperStarterChef", "ChefWannaBe", "MasterChef"]
                                  },
                      timeForPreparaion : Number,
                      StepByStep  : Array,
                    },
  rates         : { type: Schema.Types.ObjectId, ref: 'Comments'},
  likes         : Number,
  dishTypes     : Array,
  nutritionalInfo: {
    calories      : Number,
    protein       : String,
    fat           : String,
    carbs         : String
  },
  vegetarian    : Boolean,
  vegan         : Boolean,
  glutenFree    : Boolean,
  dairyFree     : Boolean,
  veryHealthy   : Boolean,
  source        : String,
  healthScore   : Number,
  usersSaved    : Array,
  usersDone     : Array,
  _creator      : { type: Schema.Types.ObjectId, ref: 'User'},
  imgUrl     : { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250" }
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

CampaignSchema.methods.belongsTo = function(comments){
  return this._rates.equals(comments._id);
};

CampaignSchema.methods.belongsTo = function(user){
  return this._creator.equals(user._id);
}

module.exports = Recipe;
