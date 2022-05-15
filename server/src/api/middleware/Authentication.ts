import JWT, { Jwt, Secret } from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import "dotenv/config";

interface IAuthentication {
  auth(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | NextFunction;
  create(payload: object): JWT.Secret | boolean;
}

class Authentication implements IAuthentication {
  auth(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | NextFunction {
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
      const data = JWT.verify(token, secret);
      console.log(data);
      return res.send(200);
    } catch (error) {
      return res.send(200);
    }
  }
  create(payload: object): JWT.Secret | boolean {
    try {
      const secret: string = process.env.SECRET || "";
      const hash = JWT.sign({ payload }, secret, { expiresIn: "1800s" });
      return hash;
    } catch (error) {
      return false;
    }
  }
}
