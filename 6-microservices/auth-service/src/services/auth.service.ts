import User from "../models/user.model";
import bcrypt from "bcryptjs";

export const registerUserService = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create(data);
  return user;
};

export const loginUserService = async (data: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(data.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};

export const getUserProfileService = async (userId: string) => {
  return User.findById(userId).select("-password");
};

export const getAllUsersService = async () => {
  return User.find().select("-password");
};