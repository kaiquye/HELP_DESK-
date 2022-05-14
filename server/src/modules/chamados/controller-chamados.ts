import express, { Request, Response } from "express";
import AppError from "../models/AppError";

import Services from "./services-chamados";

class ControllerChamados {
  async NovoChamado(req: Request, res: Response): Promise<Response> {
    try {
      console.log(req.body);
      if (!req.body) {
        return res.status(400).json({ ok: false, message: "invalid request" });
      }
      if (
        !req.body.mensagem ||
        !req.body.resumo ||
        !req.body.status ||
        !req.body.prioridade ||
        !req.body.id_usuario
      ) {
        return res.status(400).json({ ok: false, message: "invalid request" });
      }
      const response: boolean | AppError = await Services.NovoChamado(req.body);
      if (response instanceof AppError) {
        return res
          .status(Number(response.Status))
          .json(response.getMessageError());
      }
      return res.status(201).json({
        ok: response,
        message: "Chamado criado com sucesso",
      });
    } catch (error) {
      return res.status(500).json(new AppError(500).getMessageError());
    }
  }
}

export default new ControllerChamados();
