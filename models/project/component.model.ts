import mongoose from "mongoose";

interface Coordinates {
  x: number;
  y: number;
}

interface ComponentInterface {
  name: string;
  payload: object; // Here my Component Payload i.e. Data will Come
  configuration: object; // This will Contain Component Configuration
  coordinates: Coordinates[];
}

const ComponenentsSchema = new mongoose.Schema<ComponentInterface>({
  name: {
    type: String,
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

export const Component = mongoose.model("Components", ComponenentsSchema);
