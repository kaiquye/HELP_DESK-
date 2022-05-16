const { Router } = require("express");
import Controller from "../../modules/usuarios/controller-usuario";
import Authentication from "../middleware/Authentication";

import "dotenv/config";

class Routes_Setor {
  public App;

  constructor() {
    this.App = Router();
    this.Middleware();
    this.RoutesUsuarioParaAdmin();
  }

  private Middleware() {
    // verificando se o nivel de acesso da pessoal é igual: - ADMIN -
    this.App.use(Authentication.authAdministrador);
  }

  private RoutesUsuarioParaAdmin(): void {
    // rotas de gerenciamento de usuarios protegidas, somente administradores.
    this.App.post("/novosetor", Controller.create);
  }
}

export default new Routes_Setor().App;
