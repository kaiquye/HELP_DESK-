import { IAdministrador } from "./interface-administrador";
import connection from "../../config/database";

// interface de lida
interface Reader<T> {
  findAll(): Promise<T[]>;
  findOne(email: string): Promise<null | any[]>;
  exists(id: string | number): Promise<boolean>;
}

// interface para escrita
interface Write<T> {
  create(administrador: IAdministrador): Promise<number[]>;
  delete(id: number): Promise<void>;
  update(administrador: IAdministrador): Promise<void>;
}

// tipo do meu repositorio
type Repositories<T> = Reader<T> & Write<T>;

class repositories implements Repositories<IAdministrador> {
  create(administrador: IAdministrador): Promise<number[]> {
    return connection("administrador").insert(administrador);
  }
  findAll(): Promise<IAdministrador[]> {
    return connection("administrador");
  }
  async findOne(email: string): Promise<null | any[]> {
    const response = await connection("administrador")
      .select("password")
      .where("email", email);
    if (response[0] === undefined) {
      return null;
    } else {
      return response;
    }
  }

  async exists(email: string): Promise<boolean> {
    const response = await connection("administrador")
      .select("email")
      .where("email", email);
    if (response[0]) {
      return true;
    }
    return false;
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(administrador: IAdministrador): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default new repositories();
