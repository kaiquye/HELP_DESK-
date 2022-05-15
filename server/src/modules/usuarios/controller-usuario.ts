import express, { Request, Response } from "express";
import { IUsuario } from "./interface-usuario";

interface Controller<T> {
  create(usuario: T): Promise<Response>;
  findAll(): Promise<T[]>;
}

class ControllerUsuario implements Controller<IUsuario> {
    create(usuario: IUsuario): Promise<express.Response<any, Record<string, any>>> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<IUsuario[]> {
        throw new Error("Method not implemented.");
    }
}
