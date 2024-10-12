import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token" });
  }
  try {
    const decoded = jwt.verify(token, "secretKey") as {
      id: string;
      name: string;
    };
    //req.user = decoded;
    next();
  } catch (error: unknown) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
