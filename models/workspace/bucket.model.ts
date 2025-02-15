import mongoose from "mongoose";

interface BucketInterface extends mongoose.Document {
  name: string;
  files: string[];
}

const BucketSchema = new mongoose.Schema<BucketInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    files: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Bucket = mongoose.model("Bucket", BucketSchema);
