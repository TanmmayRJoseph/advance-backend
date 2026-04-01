import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { generateAccessAndRefreshToken } from "../utils/tokens";
import { Request, Response } from "express";

export const registerUser = async (req: any, res: any) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // saving user to db
    const user = new User({ username, email, password });
    const savedUser = await user.save();

    return res
      .status(201)
      .json({ message: "User registered successfully", savedUser });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    /*
      1. req.body->data
      2. username or email
      3. find the user
      4. check password
      5. generate access token and refresh token
      6. send the tokens to the client and save it in cookie and db
      */

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //   MAIN TOPIC FOR THIS PROJECT

    //   generating access token and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id,
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken",
    ); // excluding password and refresh token from the response

    // sending the tokens to the client and save it in cookie and db
    const options = {
      httpOnly: true, // making the cookie http only
      secure: process.env.NODE_ENV === "production", // making the cookie secure in production
      sameSite: "strict" as const, // preventing CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);

    return res
      .status(200)
      .json({ message: "User logged in successfully", user: loggedInUser });
  } catch (error) {
    console.log("Login Controller ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await User.findByIdAndUpdate(userId, {
      $unset: { refreshToken: 1 }, // ✅ better than undefined
    });

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
    };

    // ✅ correct method
    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);

    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    // verify the incoming refresh token
    const decoded: any = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
    );

    if (!decoded) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }

    // finding the user
    const user = await User.findById(decoded?._id);

    // checking if the refresh token is valid and matches the one in the database
    if (!user || user.refreshToken !== incomingRefreshToken) {
      return res
        .status(401)
        .json({ message: "Refresh token is expired or used" });
    }

    const accessTokenoptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 15 * 60 * 1000, // 15 minutes
    };
    const refreshTokenOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    // generating new access token and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id,
    );

    // set the new access token and refresh token in the cookie
    res.cookie("accessToken", accessToken, accessTokenoptions);
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);

    return res.status(200).json({ message: "Access token refreshed" });
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
