import { ISetor } from "./interface-setor";
import database from "../../config/database";

// interface de lida
interface Reader<T> {
  findAll(): Promise<T[]>;
  findOne(id: string | number): Promise<T>;
  exists(id: string | number): Promise<boolean>;
}

// interface para escrita
interface Write<T> {
  create(chamado: T): Promise<number[]>;
  delete(id: number): Promise<void>;
  update(chamado: T): Promise<void>;
}

// tipo do meu repositorio
type Repositories<T> = Reader<T> & Write<T>;

class RepositoriesSetor implements Repositories<ISetor> {
  findAll(): Promise<ISetor[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string | number): Promise<ISetor> {
    throw new Error("Method not implemented.");
  }
  exists(id: string | number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  create(chamado: ISetor): Promise<number[]> {
    return database("setor").insert([
      { empresa: "SENNA", setor: "Auditor", tel: 3133 },
      { empresa: "ARTYON", setor: "Tecnico", tel: 31333 },
    ]);
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(chamado: ISetor): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
export default new RepositoriesSetor();
