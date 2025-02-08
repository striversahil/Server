import mongoose from "mongoose";

interface BucketInterface {
  name: string;
  files: string[];
}

const BucketSchema = new mongoose.Schema<BucketInterface>({
  name: {
    type: String,
    required: true,
  },
  files: {
    type: [String],
    default: [],
  },
});

export const Bucket = mongoose.model("Bucket", BucketSchema);
