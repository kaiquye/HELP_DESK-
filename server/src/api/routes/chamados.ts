const { Router } = require("express");
import Controller from "../../modules/chamados/controller-chamados";
import Authentication from "../middleware/Authentication";

import "dotenv/config";

class Routes_chamdos {
  App;

  constructor() {
    this.App = Router();
    this.Middleware();
    this.Routes();
  }

  private Middleware(): void {
    // somente usuarios podem abrir chamados
    this.App.use(Authentication.authUsuario);
  }

  private Routes(): void {
    this.App.post("/novochamado", Controller.create);
    this.App.post("/buscarchamado", Controller.find); // ENVIAR O ID PELA QUERY
  }
}

export default new Routes_chamdos().App;
