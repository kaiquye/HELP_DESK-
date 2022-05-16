const { Router } = require("express");
import Controller from "../../modules/usuarios/controller-usuario";
import Authentication from "../middleware/Authentication";

import "dotenv/config";

class Routes_usuario {
  public App;

  constructor() {
    this.App = Router();
    this.RouteLogin();
    this.Middleware();
    this.RoutesUsuarioParaAdmin();
  }

  private Middleware() {
    // verificando se o nivel de acesso da pessoal é igual: - ADMIN -
    this.App.use(Authentication.authAdministrador);
  }

  private RoutesUsuarioParaAdmin(): void {
    // rotas de gerenciamento de usuarios protegidas, somente administradores.
    this.App.post("/novousuario", Controller.create);
    this.App.get("/todosusuarios", Controller.findAll);
  }
  private RouteLogin(): void {
    // rota para o usuario conseguir se logar
    this.App.post("/loginusuario", Controller.login);
  }
}

export default new Routes_usuario().App;
