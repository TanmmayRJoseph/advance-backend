import mongoose, { Schema, Document, Model } from "mongoose";
import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser } from "../types/user.types";

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // ✅ fixed typo
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

/* =========================
   MIDDLEWARE
========================= */

userSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

/* =========================
   METHODS
========================= */

userSchema.methods.isPasswordCorrect = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const expiry = process.env.ACCESS_TOKEN_EXPIRY;

  if (!secret || !expiry) {
    throw new Error("Missing JWT env variables");
  }

  const options: SignOptions = {
    expiresIn: expiry as SignOptions["expiresIn"],
  };

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    secret,
    options,
  );
};

userSchema.methods.generateRefreshToken = function (): string {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  const expiry = process.env.REFRESH_TOKEN_EXPIRY;

  if (!secret || !expiry) {
    throw new Error("Missing JWT env variables");
  }

  const options: SignOptions = {
    expiresIn: expiry as SignOptions["expiresIn"],
  };

  return jwt.sign(
    {
      _id: this._id,
    },
    secret,
    options,
  );
};


const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
