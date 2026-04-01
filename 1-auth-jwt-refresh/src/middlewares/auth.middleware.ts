import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";


export const verifyJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.header("Authorization")?.split(" ")[1] ||
      req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as jwt.JwtPayload & { _id: string };

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("JWT Middleware Error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
