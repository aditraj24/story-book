import mongoose, { Schema } from "mongoose";

/* ---------------- Media Schema ---------------- */
const mediaSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["text", "image", "video", "audio"],
      required: true,
    },
    content: {
      type: String, // for text content
      trim: true,
    },
    url: {
      type: String, // for image/video/audio
    },
    publicId: {
      type: String, // cloudinary public_id
    },
  },
  { _id: false }
);

/* ---------------- Story Schema ---------------- */
const storySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
    },
    place: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // All media (photos, videos, audio, text blocks)
    media: {
      type: [mediaSchema],
      default: [],
    },

    // Story owner
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const Story = mongoose.model("Story", storySchema);
