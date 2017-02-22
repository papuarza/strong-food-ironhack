
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RelationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    cooked: Boolean
});

const Relation = mongoose.model('Relation', RelationSchema);
module.exports = Relation;
