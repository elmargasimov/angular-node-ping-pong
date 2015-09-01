var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    playerOne: {
        _id: {
            type: Schema.ObjectId,
            ref: 'Player'
        },
        score: Number,
        name: String
    },
    playerTwo: {
        _id: {
            type: Schema.ObjectId,
            ref: 'Player'
        },
        score: Number,
        name: String
    },
    sets: Array,
    created_at: Date,
    updated_at: Date
});

GameSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

module.exports = mongoose.model('Game', GameSchema);
