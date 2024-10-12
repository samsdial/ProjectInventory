import { Request, Response } from 'express';
import jwt from "jsonwebtoken";

import { User } from "../models/User";
import { createResponse, loginResponse } from "../interfaces";

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
                return;
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "defaultSecretKey", { expiresIn: "1h" });
            const loginData: loginResponse = {
                token: token,
                user: {
                    role: user.is_admin? 'admin': 'standard',
                    email: user.email,
                    id: user.id,
                    name: user.name
                }
            };
            
            res.status(200).json(createResponse(loginData, 'Login successful', true));

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
