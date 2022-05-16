import { IAdministrador } from "./interface-administrador";
import repositories from "./repositories-administrador";
import http from "http";
import AppError from "../models/AppError";
import bcrypt from "bcrypt";

interface Services<T> {
  create(administrador: T): Promise<boolean | AppError>;
  findAll(): Promise<T[]>;
  delete(id: number): Promise<boolean>;
  login(email: string, password: string): Promise<string | AppError>;
}

class Services_Administrador implements Services<IAdministrador> {
  async login(email: string, password: string): Promise<string | AppError> {
    try {
      const PASSWORDDB: any[] | null = await repositories.findOne(email);
      if (PASSWORDDB === null) {
        return new AppError(404, "usuario invalido.");
      }
      const match: boolean = await bcrypt.compare(
        password.toString(),
        PASSWORDDB[0].password
      );
      if (!match) {
        return new AppError(404, "usuario invalido.");
      }

      return email;
    } catch (error) {
      console.log(error);
      return new AppError(500, "Não foi possivel fazer login.");
    }
  }
  async create(administrador: IAdministrador): Promise<boolean | AppError> {
    try {
      const check = await repositories.exists(administrador.email);
      if (check) return new AppError(400, "Usuario ja cadastrado");
      const salt = bcrypt.genSaltSync(10);
      const crypt = bcrypt.hashSync(administrador.password.toString(), salt);
      administrador.password = crypt;
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
