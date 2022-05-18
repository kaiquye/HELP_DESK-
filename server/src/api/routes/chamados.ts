const { Router } = require("express");
import Controller from "../../modules/chamados/controller-chamados";
import Authentication from "../middleware/Authentication";

import "dotenv/config";

class Routes_chamdos {
  App;

  constructor() {
    this.App = Router();
    this.Middleware();
    this.RoutesUsuario();
  }

  private Middleware(): void {
    // somente usuarios podem abrir chamados
    this.App.use(Authentication.authUsuario);
  }

  private RoutesUsuario(): void {
    this.App.post("/novochamado", Controller.create);
    this.App.post("/buscarchamado", Controller.find); // ENVIAR O ID PELA QUERY
  }

  private RoutesAdmin(): void {
    this.App.post("/buscarchamadosemaberto", Controller.withResponsible
    );
  }
}

export default new Routes_chamdos().App;
