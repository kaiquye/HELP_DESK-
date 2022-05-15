import { IAdministrador } from "./interface-administrador";
import repositories from "./repositories-administrador";
import http from "http";
import AppError from "../models/AppError";

interface Services<T> {
  create(administrador: T): Promise<boolean | AppError>;
  findAll(): Promise<T[]>;
  delete(id: number): Promise<boolean>;
}

class Services_Administrador implements Services<IAdministrador> {
  async create(administrador: IAdministrador): Promise<boolean | AppError> {
    try {
      const check = await repositories.exists(administrador.email);
      if (check) return new AppError(400, "Usuario ja cadastrado");
      await repositories.create(administrador);
      return true;
    } catch (error) {
      return new AppError(500, "Não foi possivel criar um novo administrador");
    }
  }
  findAll(): Promise<IAdministrador[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

export default new Services_Administrador();
