import AppError from "../models/AppError";
import { IUsuario } from "./interface-usuario";
import Repositories from "./repositories-usuario";
import bcrypt from "bcrypt";

interface Services<T> {
  create(usuario: T): Promise<boolean | AppError>;
  findAll(): Promise<T[]>;
  delete(id: number): Promise<boolean>;
}

class ServicesUsuario implements Services<IUsuario> {
  async create(usuario: IUsuario): Promise<boolean | AppError> {
    try {
      const check = await Repositories.exist(usuario.email);
      if (check) {
        return new AppError(400, "email ja cadastrado");
      }
      const _usuario = usuario;
      const salt = bcrypt.genSaltSync(10);
      const crypt = bcrypt.hashSync(usuario.password.toString(), salt);
      _usuario.password = crypt;
      await Repositories.create(_usuario);
      return true;
    } catch (error) {
      console.log(error);
      return new AppError(500);
    }
  }
  findAll(): Promise<IUsuario[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
export default new ServicesUsuario();
