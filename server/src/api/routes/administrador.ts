const { Router } = require("express");
import Controller from "../../modules/administrador/controller_administrador";

import "dotenv/config";

class Routes_Administrador {
  App;

  constructor() {
    this.App = Router();
    this.Routes();
  }

  Routes() {
    this.App.post("/novoadministrador", Controller.create);
  }
}

export default new Routes_Administrador().App;
