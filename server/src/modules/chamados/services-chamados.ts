import AppError from "../models/AppError";
import Repositories from "./repositories-chamados";
import { IChamados } from "./interface-chamados";
import { Knex } from "knex";

interface Services<T> {
  create(usuario: T): Promise<boolean | AppError>;
  findAll(): Promise<T[]>;
  delete(id: number): Promise<boolean>;
}

class ServicesChamados implements Services<IChamados> {
  findAll(): Promise<IChamados[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async create(chamado: IChamados): Promise<boolean | AppError> {
    try {
      const check = await Repositories.exists(chamado.id_usuario);
      if (check) {
        return new AppError(400, "Você ja tem um chamado em aberto");
      }
      await Repositories.create(chamado);
      return true;
    } catch (error) {
      console.log(error);
      return new AppError(500, "Não foi possivel criar um novo chamado");
    }
  }
}
export default new ServicesChamados();
