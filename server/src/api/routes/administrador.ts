const { Router } = require("express");
import Controller from "../../modules/administrador/controller_administrador";
import Authentication from "../middleware/Authentication";

import "dotenv/config";

class Routes_Administrador {
  App;

  constructor() {
    this.App = Router();
    this.RouteLogin();
    
    this.Middleware();
    this.Routes();
  }

  private Middleware(): void {
    this.App.use(Authentication.authAdministrador);
  }

  private Routes() {
    this.App.post("/novoadministrador", Controller.create);
  }

  private RouteLogin(): void {
    this.App.post("/loginadministrador", Controller.login);
  }
}

export default new Routes_Administrador().App;
