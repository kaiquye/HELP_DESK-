import AppError from "../models/AppError";
import Repositories from "./repositories-chamados";
import { IChamados } from "./interface-chamados";
import { Knex } from "knex";

class ServicesChamados {
  async NovoChamado(chamado: IChamados): Promise<boolean | AppError> {
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
