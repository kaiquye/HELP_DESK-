import express, { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import AppError from "../models/AppError";
import { IChamados } from "./interface-chamados";
import Services from "./services-chamados";

interface Controller<T> {
  create(req: Request, res: Response): Promise<Response>;
  find(req: Request, res: Response): Promise<Response>;
  withResponsible(req: Request, res: Response): Promise<Response>;
}

class ControllerChamados implements Controller<IChamados> {
  async withResponsible(req: Request, res: Response): Promise<Response> {
    try {
      if (req.query.id_admin) {
        const response = await Services.withResponsibleByAdmin(
          Number(req.query.id_adm)
        );
        return res.status(200).json({
          ok: true,
          message:
            "todos chamados que estão sendo atendidos pelo " + req.query.id_adm,
          data: response,
        });
      }
      const response = await Services.withResponsible();
      return res.status(200).json({
        ok: true,
        message: "todos registros com um responsavel ( em andamento )",
        data: response,
      });
    } catch (error) {
      return res.status(500).json(new AppError(500).getMessageError());
    }
  }
  async find(req: Request, res: Response): Promise<Response> {
    try {
      if (req.query.id_chamado) {
        const response_by_id = await Services.find(
          Number(req.query.id_chamado)
        );
        return res.status(200).json({
          ok: true,
          message: "Retornando o chamado do ID : " + req.query.id_chamado,
          data: response_by_id,
        });
      }
      const response_all = await Services.findAll();
      return res.status(200).json({
        ok: true,
        message: "Retornando todos os chamados : " + req.query.id_chamado,
        data: response_all,
      });
    } catch (error) {
      return res.status(500).json(new AppError(500).getMessageError());
    }
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
