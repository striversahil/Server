import mongoose from "mongoose";

export interface SectionInterface {
  name: string;
  layout: any;
  appearence: any;
  columns: mongoose.Types.ObjectId[];
}
export const SectionSchema = new mongoose.Schema<SectionInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    layout: {
      type: Object,
      // required: true,
    },
    appearence: {
      type: Object,
      // required: true,
    },
    columns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
  },
  { timestamps: true }
);

export const Section = mongoose.model("Section", SectionSchema);
