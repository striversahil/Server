import mongoose from "mongoose";

interface Coordinates {
  x: number;
  y: number;
}

interface ComponentInterface {
  name: string;
  user: mongoose.Types.ObjectId;
  payload: object; // Here my Component Metadata will Come
  configuration: object; // This will Contain Component Configuration
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
      default: [0, 0],
    },
  ],
  payload: {
    type: Object,
    required: true,
  },
  configuration: {
    type: Object,
    required: true,
  },
});

export const Bucket = mongoose.model("Components", ComponenentsSchema);
