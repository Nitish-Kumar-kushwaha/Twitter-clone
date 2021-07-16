const mongoose = require("mongoose");

const postSchmea = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchmea);

module.exports = Post;
