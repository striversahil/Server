import mongoose from "mongoose";

export interface ComponentInterface extends mongoose.Document {
  name: string;
  payload: object; // Here my Component Payload i.e. Data will Come
  configuration: object; // This will Contain Component Configuration
  coordinates: {
    x: number;
    y: number;
  };
}

const ComponenentsSchema = new mongoose.Schema<ComponentInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    coordinates: {
      type: Object,
      required: true,
    },
    payload: {
      type: Object,
      required: true,
    },
    configuration: {
      // Let Id for Drag and Drop be Stored Here
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Component = mongoose.model("Component", ComponenentsSchema);
