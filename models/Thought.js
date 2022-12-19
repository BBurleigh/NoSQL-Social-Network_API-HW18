const { timeStamp } = require('console');
const { Schema, model } = require('mongoose');
const formatDate = require('../utils/formatDate');

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
            get: (timestamp) => formatDate(timestamp)
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
            get: (timestamp) => formatDate(timestamp)
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

module.export = thoughtSchema;