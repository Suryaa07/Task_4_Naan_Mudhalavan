const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
// const moment = require('moment');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Please leave a thought.',
      maxlength: 280,
      minlength: 1
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get( function() {
  return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;