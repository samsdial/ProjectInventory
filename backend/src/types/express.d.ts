import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        username: string;
        is_admin: boolean;
      };
    }
  }
}
