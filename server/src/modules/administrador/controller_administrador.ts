import Services from "./services-administrador";
import express, { Request, Response } from "express";
import AppError from "../models/AppError";

class Controller_Administrador {
  async NovoAdministrador(req: Request, res: Response): Promise<Response> {
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
      const response: Boolean | AppError = await Services.NovoAdministrador(
        req.body
      );
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
}

export default new Controller_Administrador();
