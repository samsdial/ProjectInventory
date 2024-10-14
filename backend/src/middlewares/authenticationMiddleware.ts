import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, "mysecretkey") as {
      id: string;
      name: string;
      username: string;
      email: string;
      is_admin: boolean;
    };

    req.user = decoded;
    next();
  } catch (error: unknown) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
