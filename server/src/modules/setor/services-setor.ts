import repositoreisSetor from "./repositoreis-setor";
import AppError from "../../modules/models/AppError";
import { ISetor } from "./interface-setor";

interface Services<T> {
  create(setor: T): Promise<boolean | AppError>;
  findAll(): Promise<T[]>;
  delete(id: number): Promise<boolean>;
}

class ServicesSetor implements Services<ISetor> {
  public async create(setor: ISetor): Promise<boolean | AppError> {
    try {
      await repositoreisSetor.create(setor);
      return true;
    } catch (error) {
      console.log(error);
      return new AppError(500, "Não foi possivel criar um novo setor");
    }
  }
  public async findAll(): Promise<ISetor[]> {
    throw new Error("Method not implemented.");
  }
  public async delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

export default new ServicesSetor();
