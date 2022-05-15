import JWT, { Jwt, Secret } from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import "dotenv/config";

interface IAuthentication {
  authUsuario(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | NextFunction;
  create(payload: IpayloadRole): JWT.Secret | boolean;
}

type IpayloadRole = {
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
      const { payload } = JWT.verify(token, secret);
      next();
    } catch (error) {
      console.log(error);
      return res.send(200);
    }
  }
  create(payload: IpayloadRole): JWT.Secret | boolean {
    try {
      const secret: string = process.env.SECRET || "";
      const hash = JWT.sign({ payload }, secret, { expiresIn: "1800s" });
      return hash;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new Authentication();
