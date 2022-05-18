import JWT, { Jwt, Secret } from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import "dotenv/config";
import AppError from "../modules/models/AppError";

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
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return res.status(401).json({
        ok: false,
        status_code: http.STATUS_CODES[401],
        message: "token não infomado",
      });
    }

    const [, token] = authorization.split(" ");

    console.log(token);

    try {
      const secret: string = process.env.SECRET || "";
      const { email, role } = JWT.verify(token, secret) as JwtPayload;
      if (role === "USUARIO") {
        return next();
      } else {
        return res
          .status(401)
          .json(
            new AppError(401, "não tem permissão de usuario.").getMessageError()
          );
      }
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
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return res.status(401).json({
        ok: false,
        status_code: http.STATUS_CODES[401],
        message: "token não infomado",
      });
    }

    const [, token] = authorization.split(" ");

    console.log(token);

    try {
      const secret: string = process.env.SECRET || "";
      const { email, role } = JWT.verify(token, secret) as JwtPayload;
      if (role === "ADMIN") {
        return next();
      } else {
        return res
          .status(401)
          .json(
            new AppError(401, "Não tem permissão de admin").getMessageError()
          );
      }
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
