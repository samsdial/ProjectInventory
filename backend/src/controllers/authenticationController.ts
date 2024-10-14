import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/User";
import { createResponse, loginResponse } from "../interfaces";

export const authenticationController = {
  userLogin: async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        res.status(403).json(createResponse(null, "User wasn't found", false));
        return;
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(403).json(createResponse(null, "Wrong password", false));
        return;
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "defaultSecretKey", { expiresIn: "1h" });
      const loginData: loginResponse = {
        token: token,
        user: {
          role: user.is_admin ? "admin" : "standard",
          email: user.email,
          id: user.id,
          name: user.name,
        },
      };

      res.status(200).json(createResponse(loginData, "Login successful", true));
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json(createResponse(null, error.message, false));
        return;
      } else {
        res.status(500).json(createResponse(null, "Unexpected error occurred", false));
        return;
      }
    }
  },

  register: async (req: Request, res: Response): Promise<void> => {
    const { email, name, password, username } = req.body;

    try {
      const user = await User.exists({
        $or: [{ username }, { email }],
      });

      if (user) {
        res.status(400).json(createResponse(null, "An user with this email or username already exists", false));
        return;
      }
      const newUser = new User({ email, name, password, username });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, "secretKey", { expiresIn: "1h" });
      const userInfo: loginResponse = {
        token: token,
        user: {
          role: newUser.is_admin ? "admin" : "standard",
          email: newUser.email,
          id: newUser.id,
          name: newUser.name,
        },
      };

      res.status(201).json(createResponse(userInfo, "User account successfully created", true));
      return;
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json(createResponse(null, error.message, false));
        return;
      }
      res.status(500).json(createResponse(null, "Unexpected error occurred", false));
      return;
    }
  },
};

export default authenticationController;
