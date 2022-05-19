import AppError from "../models/AppError";
import { IUsuario } from "./interface-usuario";
import Repositories from "./repositories-usuario";
import sendEmail from "../../email/novaConta/index";
import bcrypt from "bcrypt";

interface Services<T> {
  create(usuario: T): Promise<boolean | AppError>;
  findAll(): Promise<T[]>;
  delete(id: number): Promise<boolean>;
  login(email: string, password: string): Promise<string | AppError>;
}

class ServicesUsuario implements Services<IUsuario> {
  async login(email: string, password: string): Promise<string | AppError> {
    try {
      const passwordDB: any[] | null = await Repositories.find(email);
      if (passwordDB == null) {
        return new AppError(404, "usuario invalido.");
      }
      const match: boolean = await bcrypt.compare(
        password.toString(),
        passwordDB[0].password
      );
      if (!match) {
        return new AppError(404, "usuario invalido.");
      }
      return email;
    } catch (error) {
      return new AppError(500);
    }
  }
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
      const email = new sendEmail(usuario.email, usuario.nome);
      await email.sendEmail();
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
