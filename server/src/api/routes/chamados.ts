const { Router } = require("express");
import Controller from "../../modules/chamados/controller-chamados";

import "dotenv/config";

class Routes_chamdos {
  App;

  constructor() {
    this.App = Router();
    this.Routes();
  }

  Routes() {
    this.App.post("/novochamado", Controller.create);
  }
}

export default new Routes_chamdos().App;
