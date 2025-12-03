import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser, JwtUser } from "../interfaces/auth.interfaces";
import { tokenBlacklist } from "../utils/tokenBlacklist";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      token?: string;
      loggedInUser?: JwtUser;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  // check blacklist
  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ error: "Token invalid (logged out)" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    req.loggedInUser = { id: decoded.id, role: decoded.role };
    req.token = token; // <-- Important for logout endpoint

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IUser;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ error: "Unauthorized access" });
      return;
    }
    next();
  };
};
