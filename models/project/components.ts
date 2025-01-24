import mongoose from "mongoose";

interface Coordinates {
  x: number;
  y: number;
}

interface ComponentInterface {
  name: string;
  user: mongoose.Schema.Types.ObjectId;
  coordinates: Coordinates[];
}

const ComponenentsSchema = new mongoose.Schema<ComponentInterface>({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coordinates: [
    {
      x: {
        type: Number,
        required: true,
      },
      y: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const Bucket = mongoose.model("Components", ComponenentsSchema);
