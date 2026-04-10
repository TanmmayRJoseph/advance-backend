import { Request, Response } from "express";
import {
  registerUserService,
  loginUserService,
  getUserProfileService,
  getAllUsersService,
} from "../services/auth.service";
import { generateToken } from "../utils/generateToken";
import { getChannel } from "../configs/rabbitmq";

const events = {
  USER_REGISTERED: "USER_REGISTERED",
  USER_LOGGED_IN: "USER_LOGGED_IN",
};

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const user = await registerUserService(req.body);

    // sending the notification to the notification service
    const channel = getChannel();
    channel.sendToQueue(
      "notifications",
      Buffer.from(
        JSON.stringify({
          type: events.USER_REGISTERED,
          message: "User registered successfully",
          user: user,
        }),
      ),
    );

    console.log(
      "Notification of registration sent to the notification service",
    );

    res.status(201).json({ user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const user = await loginUserService(req.body);

    const token = generateToken(user._id.toString(), user.role);

    // 🍪 Set cookie
    res.cookie("token", token, {
      httpOnly: true, // 🔥 prevents XSS
      secure: false, // true in production (HTTPS)
      sameSite: "lax", // or "strict"
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // sending the notification to the notification service
    const channel = getChannel();
    channel.sendToQueue(
      "notifications",
      Buffer.from(
        JSON.stringify({
          type: events.USER_LOGGED_IN,
          message: "User logged in successfully",
          user: user,
        }),
      ),
    );
    
    res.json({
      message: "Login successful",
      user,
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const getUserProfileController = async (req: any, res: Response) => {
  try {
    const user = await getUserProfileService(req.user.id);
    res.json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllUsersForAdminController = async (
  req: any,
  res: Response,
) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
