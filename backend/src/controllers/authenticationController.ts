import { Request, Response } from 'express';

import { User } from "../models/User";
import jwt from "jsonwebtoken";

const authenticationController = {
    userLogin: async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        res.status(403).json({ message: "User wasn't found" });
        return;
      }
      
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
         res.status(403).json({ message: "Wrong password" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "defaultSecretKey", { expiresIn: "1h" });
       res.status(200).json({ token });

    } catch (error: unknown) {
        if (error instanceof Error) {
             res.status(500).json({ error: error.message });
        } else {
             res.status(500).json({ error: 'Unexpected error occurred' });
        }
      }
  },

  register: (req: Request, res: Response): void => {
    res.json({ message: 'User registered successfully' });
  },
};

export default authenticationController;
