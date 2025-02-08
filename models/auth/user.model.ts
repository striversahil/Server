import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User extends mongoose.Document {
  name: string;
  email: string;
  refreshToken: string;
  password: string;
  profile: mongoose.Types.ObjectId;
  workspaces: mongoose.Types.ObjectId[]; // Used mongoose.types.objectId because needed to convert string to object id
  createdAt: Date;
  updatedAt: Date;
  isCorrectPassword: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

// interface Workspace {
//   name: string;
//   user: mongoose.Schema.Types.ObjectId;
//   private: boolean;
// }

// // We are Creating Info Schema Containing Basic Details of Workspace

// const WorkspaceInfoSchema: mongoose.Schema<Workspace> = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
//   private: {
//     type: Boolean,
//     default: false,
//   },
// });

const UserSchema: mongoose.Schema<User> = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    refreshToken: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Password is required "],
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    workspaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
      },
    ],
  },
  { timestamps: true }
);

// Add password as it is there in Controller but before saving to DB we will hash it

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string }
  );
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string }
  );
};

export const User = mongoose.model("User", UserSchema);
