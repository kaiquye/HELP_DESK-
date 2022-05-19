import database from "../../config/database";
import { IChamados } from "./interface-chamados";
import Knex from "knex";
import { IUsuario } from "../usuarios/interface-usuario";

// interface de lida
interface Reader<T> {
  find(id: number): Promise<T[]>;
  findAll(): Promise<T[]>;
  findOne(id: string | number): Promise<IUsuario[]>;
  exists(id: string | number): Promise<boolean>;
  findWithResponsibleByAdmin(id: number): Promise<T[]>;
  WithResponsible(): Promise<T[]>;
}

// interface para escrita
interface Write<T> {
  create(chamado: IChamados): Promise<void>;
  delete(id: number): Promise<void>;
  update(chamado: IChamados): Promise<void>;
}

// tipo do meu repositorio
type Repositories<T> = Reader<T> & Write<T>;

// class repositorio implementando o tipo de escrita e lida
class RepositoriesChamados implements Repositories<IChamados> {
  async WithResponsible(): Promise<IChamados[]> {
    return await database("CHAMADOS")
      .select(
        "mensagem",
        "resumo",
        "status",
        "prioridade",
        "id_adm",
        "id_usuario"
      )
      .whereNot("id_admin", null);
  }
  async findWithResponsibleByAdmin(id: number): Promise<IChamados[]> {
    return await database("CHAMADOS")
      .select(
        "mensagem",
        "resumo",
        "status",
        "prioridade",
        "id_adm",
        "id_usuario"
      )
      .where("id_admin", id);
  }
  async find(id: number): Promise<IChamados[]> {
    return await database("CHAMADOS")
      .select(
        "mensagem",
        "resumo",
        "status",
        "prioridade",
        "id_adm",
        "id_usuario"
      )
      .where("idChamados", id);
  }
  async create(chamado: IChamados): Promise<void> {
    await database("CHAMADOS").insert(chamado);
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
  async findOne(id: string | number): Promise<IUsuario[]> {
    return database("usuario")
      .select("nome", "email", "tel", "cargo", "active", "idSetor")
      .where("idUSUARIO", id);
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
