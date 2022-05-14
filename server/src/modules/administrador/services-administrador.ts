import { IAdministrador } from "./interface-administrador";
import repositories from "./repositories-administrador";
import http from "http";
import AppError from "../models/AppError";

class Services_Administrador {
  async NovoAdministrador(
    administrador: IAdministrador
  ): Promise<Boolean | AppError> {
    try {
      const check = await repositories.exists(administrador.email);
      if (check) return new AppError(400, "Usuario ja cadastrado");
      await repositories.create(administrador);
      return true;
    } catch (error) {
      return new AppError(500, "Não foi possivel criar um novo administrador");
    }
  }
}

export default new Services_Administrador();
