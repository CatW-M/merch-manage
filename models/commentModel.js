const mongoose = require(`mongoose`);

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, "Comment can not be empty."],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Each comment must have an author"],
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
      required: [true, "Each comment must be associated with a project"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name _id",
  });

  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
