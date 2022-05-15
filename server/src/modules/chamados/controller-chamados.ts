import express, { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import AppError from "../models/AppError";
import { IChamados } from "./interface-chamados";
import Services from "./services-chamados";

interface Controller<T> {
  create(req: Request, res: Response): Promise<Response>;
  findAll(req: Request, res: Response): Promise<Response>;
}

class ControllerChamados implements Controller<IChamados> {
  findAll(
    req: express.Request<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >,
    res: express.Response<any, Record<string, any>>
  ): Promise<express.Response<any, Record<string, any>>> {
    throw new Error("Method not implemented.");
  }
  async create(req: Request, res: Response): Promise<Response> {
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
      const response: boolean | AppError = await Services.create(req.body);
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
