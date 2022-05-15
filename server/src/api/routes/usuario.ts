const { Router } = require("express");
import Controller from "../../modules/usuarios/controller-usuario";

import "dotenv/config";

class Routes_usuario {
  public App;

  constructor() {
    this.App = Router();
    this.Routes();
  }

  Routes(): void {
    this.App.post("/novousuario", Controller.create);
    this.App.post("/loginusuario", Controller.login);
  }
}

export default new Routes_usuario().App;
