import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { match } from "node-match-path";
import HttpException from "../utils/exceptions/http.exception";
import httpContext from "express-http-context";
import UnprotectedRoutes from "../config/auth/unprotected-routes";
import { ExtendedError } from "socket.io/dist/namespace";
import jwt from "jsonwebtoken";
import { UserEntity } from "@core/user/user.entity";

const authenticate = ({ req, res, next, callback }) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    try {
      callback(error, user, info);
      next();
    } catch (err) {
      next(err);
    }
  })(req, res, next);
};

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const isUnProtected = UnprotectedRoutes.find((unprotectedRoute) => {
    const { matches } = match(unprotectedRoute, req.path);
    return matches;
  });

  if (isUnProtected) return next();

  authenticate({
    req,
    res,
    next,
    callback(error, user: UserEntity, info) {
      if (error || !user || !user.refreshToken) throw new HttpException(401, "Unauthorized");
      const userInfo = (({ id, email }) => ({ id, email }))(user);
      httpContext.set("user", userInfo);
    },
  });
};

const SocketAuthMiddleware = (
  req: { headers: { Authorization: string } },
  next: (err?: ExtendedError) => void,
) => {
  authenticate({
    req,
    res: {},
    next,
    callback(error, user, info) {
      if (!user || error) throw new Error(info.message);
    },
  });
};

export { SocketAuthMiddleware };
export default AuthMiddleware;
