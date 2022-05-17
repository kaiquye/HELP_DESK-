import AppError from "../models/AppError";
import Repositories from "./repositories-chamados";
import { IChamados } from "./interface-chamados";
import { Knex } from "knex";

interface Services<T> {
  create(usuario: T): Promise<boolean | AppError>;
  findAll(): Promise<T[]>;
  delete(id: number): Promise<boolean>;
  find(id: number): Promise<T[] | null | AppError>;
}

class ServicesChamados implements Services<IChamados> {
  async find(id: number): Promise<IChamados[] | null | AppError> {
    try {
      const response = await Repositories.find(id);
      if (response[0] === undefined) {
        return null;
      }

      let status_chamado = "inativo";

      if (response[0].status === "10") {
        status_chamado = "em espera";
      }
      if (response[0].status === "50") {
        status_chamado = "em progresso";
      }
      if (response[0].status === "100") {
        status_chamado = "finalizado";
      }

      return [
        {
          mensagem: response[0].mensagem,
          resumo: response[0].resumo,
          status: status_chamado,
          prioridade: response[0].prioridade,
          id_usuario: response[0].prioridade,
          id_adm: response[0].id_adm,
        },
      ];
    } catch (error) {
      console.log(error);
      return new AppError(500, "Não foi possivel criar um novo chamado");
    }
  }
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
