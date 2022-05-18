import express, { Request, Response } from "express";
import http from "http";
import Authentication from "../../middleware/Authentication";
import AppError from "../models/AppError";
import { IUsuario } from "./interface-usuario";
import Services from "./services-usuario";

interface Controller<T> {
  create(req: Request, res: Response): Promise<Response>;
  findAll(req: Request, res: Response): Promise<Response>;
  login(req: Request, res: Response): Promise<Response>;
}

class ControllerUsuario implements Controller<IUsuario> {
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const response = await Services.login(req.body.email, req.body.password);
      if (response instanceof AppError) {
        return res
          .status(Number(response.Status))
          .json(response.getMessageError());
      }
      const token = Authentication.create({ email: response, role: "USUARIO" });
      return res.status(200).json({
        ok: true,
        message: "usuario logado",
        token: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(new AppError(500).getMessageError());
    }
  }
  async create(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body) {
        return res.status(400).json({ ok: false, message: "invalid body" });
      }
      if (
        !req.body.nome ||
        !req.body.email ||
        !req.body.tel ||
        !req.body.cargo ||
        !req.body.password || 
        !req.body.idSetor
      ) {
        return res.status(400).json({ ok: false, message: "Invalid args" });
      }
      const response = await Services.create(req.body);
      if (response instanceof AppError) {
        return res
          .status(Number(response.Status))
          .json(response.getMessageError());
      }
      return res.status(201).json({
        ok: true,
        message: " Usuario criado com sucesso ",
        status_code: http.STATUS_CODES[201],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(new AppError(500).getMessageError());
    }
  }
  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const response = await Services.findAll();
      return res.status(200).json({
        ok: true,
        message: "todos usuarios",
        data: response,
      });
    } catch (error) {
      return res.status(500).json(new AppError(500).getMessageError());
    }
  }
}
export default new ControllerUsuario();
