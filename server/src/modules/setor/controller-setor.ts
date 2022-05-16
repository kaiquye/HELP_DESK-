import express, { Response, Request } from "express";
import AppError from "../models/AppError";
import { ISetor } from "./interface-setor";
import Services from "./services-setor";

interface Controller<T> {
  create(req: Request, res: Response): Promise<Response>;
  findAll(req: Request, res: Response): Promise<Response>;
}

class ControllerSetor implements Controller<ISetor> {
  async create(req: Request, res: Response): Promise<Response> {
    if (req.body) {
      return res.status(400).json({ ok: false, message: "invalid args" });
    }
    if (!req.body.empresa || !req.body.setor || !req.body.tel) {
      return res.status(400).json({ ok: false, message: "invalid args" });
    }
    try {
      const response: boolean | AppError = await Services.create({
        empresa: req.body.empresa,
        setor: req.body.setor,
        tel: req.body.tel,
      });
      if (response instanceof AppError) {
        return res
          .status(Number(response.Status))
          .json(response.getMessageError());
      }
      return res.status(201).json({
        ok: true,
        message: "Setor criado com sucesso",
      });
    } catch (error) {
      return res.status(500).json(new AppError(500).getMessageError());
    }
  }
  findAll(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}

export default new ControllerSetor();
