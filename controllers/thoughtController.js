const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find() 
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        thoughts.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'You cannot find this thought since this ID does not exist.' })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true}
        ) 
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'Cannot update thought since this ID does not exist.' })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'You cannot delete this thought because this ID does not exist.' })
          : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId  } },
            { new: true }
            )
      )
      .then((user) => 
      !user
      ? res.status(404).json({ message: "Though the user does not exist, the thought was deleted."})
      :res.json({ message: "This user's thought has been deleted." })
      )
      .catch((err) => res.status(500).json(err));
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: "You cannot add a reaction to this thought since the thought's id does not exist." })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.body.reactionId} } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: "You cannot delete this reactions because its ID does not exist." })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
};