import database from "../../config/database";
import { IChamados } from "./interface-chamados";
import Knex from "knex";

// interface de lida
interface Reader<T> {
  findAll(): Promise<T[]>;
  findOne(id: string | number): Promise<T>;
  exists(id: string | number): Promise<boolean>;
}

// interface para escrita
interface Write<T> {
  create(chamado: IChamados): Promise<number[]>;
  delete(id: number): Promise<void>;
  update(chamado: IChamados): Promise<void>;
}

// tipo do meu repositorio
type Repositories<T> = Reader<T> & Write<T>;

// class repositorio implementando o tipo de escrita e lida
class RepositoriesChamados implements Repositories<IChamados> {
  async create(chamado: IChamados): Promise<number[]> {
    return await database("CHAMADOS").insert(chamado);
  }
  async delete(id: number): Promise<void> {
    await database("CHAMADOS").del().where("idCHAMADOS", id);
  }
  async update(chamado: IChamados): Promise<void> {
    await database("CHAMADOS")
      .update(chamado)
      .where("idCHAMADO", chamado.id_usuario);
  }
  async findAll(): Promise<IChamados[]> {
    const response = await database("CHAMADOS");
    return response;
  }
  async findOne(id: string | number): Promise<IChamados> {
    throw new Error("Method not implemented.");
  }
  async exists(id: number): Promise<boolean> {
    const exists: any = await database("CHAMADOS")
      .select("id_usuario")
      .where("id_usuario", id);
    if (exists[0]) {
      return true;
    }
    return false;
  }
}

export default new RepositoriesChamados();
