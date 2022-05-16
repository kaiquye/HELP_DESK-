import JWT, { Jwt, Secret } from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import "dotenv/config";
import AppError from "../../modules/models/AppError";

interface IAuthentication {
  authUsuario(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | NextFunction;
  authAdministrador(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | NextFunction;
  create(payload: JwtPayload): JWT.Secret | boolean;
}

type JwtPayload = {
  email: string;
  role: string | number;
};

class Authentication implements IAuthentication {
  authUsuario(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | NextFunction | any {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({
        ok: false,
        status_code: http.STATUS_CODES[401],
        message: "token não infomado",
      });
    }
    try {
      const secret: string = process.env.SECRET || "";
      const { email, role } = JWT.verify(token, secret) as JwtPayload;
      if (role === "ADMIN") {
        return next();
      }
      return res.status(401).json(new AppError(401).getMessageError());
    } catch (error) {
      console.log(error);
      return res.status(401).json(new AppError(401).getMessageError());
    }
  }

  authAdministrador(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | NextFunction | any {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({
        ok: false,
        status_code: http.STATUS_CODES[401],
        message: "token não infomado",
      });
    }
    try {
      const secret: string = process.env.SECRET || "";
      const { email, role } = JWT.verify(token, secret) as JwtPayload;
      if (role === "USUARIO") {
        return next();
      }
      return res.status(401).json(new AppError(401).getMessageError());
    } catch (error) {
      console.log(error);
      return res.status(401).json(new AppError(401).getMessageError());
    }
  }

  create(payload: JwtPayload): JWT.Secret | boolean {
    try {
      const secret: string = process.env.SECRET || "";
      const hash = JWT.sign(
        { email: payload.email, role: payload.role },
        secret,
        { expiresIn: "1800s" }
      );
      return hash;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new Authentication();
