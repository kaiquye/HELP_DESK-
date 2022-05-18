import AppError from "../models/AppError";
import Repositories from "./repositories-chamados";
import { IChamados } from "./interface-chamados";
import { Knex } from "knex";

interface Services<T> {
  create(usuario: T): Promise<boolean | AppError>;
  findAll(): Promise<T[] | null | AppError>;
  delete(id: number): Promise<boolean>;
  find(id: number): Promise<T[] | null | AppError>;
  withResponsibleByAdmin(id: number): Promise<T[] | null | AppError>;
  withResponsible(): Promise<T[] | null | AppError>;
}

class ServicesChamados implements Services<IChamados> {
  async withResponsible(): Promise<IChamados[] | AppError | null> {
    try {
      const response = await Repositories.WithResponsible();
      if (response === undefined) {
        return null;
      }
      return response;
    } catch (error) {
      console.log(error);
      return new AppError(500, "Não foi possivel criar um novo chamado");
    }
  }
  async withResponsibleByAdmin(
    id: number
  ): Promise<IChamados[] | AppError | null> {
    try {
      const response = await Repositories.findWithResponsibleByAdmin(id);
      if (response[0] === undefined) {
        return null;
      }
      return response;
    } catch (error) {
      console.log(error);
      return new AppError(500, "Não foi possivel criar um novo chamado");
    }
  }
  async find(id: number): Promise<IChamados[] | null | AppError> {
    try {
      const response = await Repositories.find(id);
      console.log(response);
      if (response[0] === undefined) {
        return null;
      }
      let status_chamado = "s";

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
  async findAll(): Promise<IChamados[] | null | AppError> {
    try {
      const response = await Repositories.findAll();
      if (response[0] === undefined) {
        return null;
      }
      return response;
    } catch (error) {
      console.log(error);
      return new AppError(500, "Não foi possivel criar um novo chamado");
    }
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
