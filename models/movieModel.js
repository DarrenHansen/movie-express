import mongoose from "mongoose";
import UserModel from "./userModel.js";

const MovieSchema = new mongoose.Schema(
  {
    judul: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    tahunRilis: {
      type: String,
      required: true,
      trim: true,
    },
    sutradara: {
      type: String,
      required: true,
      trim: true,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: UserModel,
    },
  },
  {
    timestamps: true,
  }
);

const MovieModel = mongoose.model("movies", MovieSchema);

export default MovieModel;
