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
    this.Routes();
  }

  private Middleware() {
    // verificando se o nivel de acesso da pessoal é igual a a - USUARIO -
    this.App.use(Authentication.authUsuario);
  }

  private Routes(): void {
    // rotas protegidas
    this.App.post("/novousuario", Controller.create);
  }
  private RouteLogin(): void {
    // rota para o usuario conseguir se logar
    this.App.post("/loginusuario", Controller.login);
  }
}

export default new Routes_usuario().App;
