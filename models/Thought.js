const moment = require('moment');
const { Schema, model } = require('mongoose');
// const { Thought } = require('.');
// const formatDate = require('../utils/formatDate');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeStamp => moment(timeStamp).format('MMM DD, YYYY [at] h:mm a')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        }
    }
);

thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
})

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeStamp => moment(timeStamp).format('MMM DD, YYYY [at] h:mm a')
        }
    },
    {
        toJSON: {
            getter: true
        },
        id: false,
    }
);

const Schema = model('Thought', thoughtSchema);

module.exports = Thought;