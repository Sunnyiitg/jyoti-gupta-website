import mongoose, { Schema } from "mongoose";

const PostSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
    },

    author: {
      type: String,
    },
    content: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
