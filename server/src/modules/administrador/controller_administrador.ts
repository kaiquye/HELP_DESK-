import Services from "./services-administrador";
import express, { Request, Response } from "express";
import AppError from "../models/AppError";
import { IAdministrador } from "./interface-administrador";
import Authentication from "../../api/middleware/Authentication";

interface Controller<T> {
  create(req: Request, res: Response): Promise<Response>;
  findAll(req: Request, res: Response): Promise<Response>;
  login(req: Request, res: Response): Promise<Response>;
}

class Controller_Administrador implements Controller<IAdministrador> {
  findAll(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  async create(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body) {
        return res.status(400).json({ ok: false, message: "invalid request" });
      }
      if (
        !req.body.nome ||
        !req.body.cargo ||
        !req.body.password ||
        !req.body.email ||
        !req.body.tel ||
        !req.body.active
      ) {
        return res.status(400).json({ ok: false, message: "invalid body" });
      }
      const response: Boolean | AppError = await Services.create(req.body);
      if (response instanceof AppError) {
        return res
          .status(Number(response.Status))
          .json(response.getMessageError());
      }
      return res.status(201).json({
        ok: true,
        message: "Criado com sucesso",
      });
    } catch (error) {
      return res.status(500).json(new AppError(500).getMessageError());
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body) {
        return res.status(400).json({ ok: false, message: "invalid request" });
      }
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({ ok: false, message: "invalid args" });
      }
      const response: string | AppError = await Services.login(
        req.body.email,
        req.body.password
      );
      if (response instanceof AppError) {
        return res
          .status(Number(response.Status))
          .json(response.getMessageError());
      }
      const token = Authentication.create({ role: "ADMIN", email: response });
      if (!token) {
        return res
          .status(400)
          .json({ ok: false, message: "error in authtentication." });
      }
      return res
        .status(200)
        .json({ ok: true, message: "admin logado com sucesso", token });
    } catch (error) {
      return res.status(500).json(new AppError(500).getMessageError());
    }
  }
}

export default new Controller_Administrador();
