import { IUsuario } from "./interface-usuario";
import Connection from "../../config/database";
interface Reader<T> {
  findAll(): Promise<T[]>;
  find(id: number): Promise<T>;
  exist(email: string): Promise<boolean>;
}

interface Write<T> {
  create(usuario: T): Promise<number[]>;
  update(id: number): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}

type Repositories<T> = Reader<T> & Write<T>;

class RepositoriesUsuario implements Repositories<IUsuario> {
  async findAll(): Promise<IUsuario[]> {
    return await Connection("usuario");
  }
  async exist(email: string): Promise<boolean> {
    const resposne = await Connection("usuario")
      .select("email")
      .where("email", email);
    if (resposne[0]) {
      return true;
    }
    return false;
  }
  async create(usuario: IUsuario): Promise<number[]> {
    return await Connection("usuario").insert(usuario);
  }
  find(id: number): Promise<IUsuario> {
    throw new Error("Method not implemented.");
  }
  async update(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
export default new RepositoriesUsuario();
