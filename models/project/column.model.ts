import mongoose from "mongoose";

export interface ColumnInterface {
  name: String;
  layout: any;
  appearance?: any;
  components: mongoose.Types.ObjectId[];
}

export const ColumnSchema = new mongoose.Schema<ColumnInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    layout: {
      type: Object,
      required: true,
    },
    appearance: {
      type: Object,
    },
    components: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Component",
      },
    ],
  },

  { timestamps: true }
);

export const Column = mongoose.model("Column", ColumnSchema);
