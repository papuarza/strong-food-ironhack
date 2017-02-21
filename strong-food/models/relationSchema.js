/*jshint esversion: 6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RelationSchema = new Schema({
    userId: String,
    recipeId: String,
    _userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _recipeId: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    },
});

const Relation = mongoose.model('Relation', RelationSchema);
module.exports = Relation;
