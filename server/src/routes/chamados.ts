const { Router } = require("express");
import Controller from "../modules/chamados/controller-chamados";
import Authentication from "../middleware/Authentication";

import "dotenv/config";

class Routes_chamdos {
  public App;

  constructor() {
    this.App = Router();
    this.RoutesAdmin(); // autenticação feita na rota.
    this.Middleware();
    this.RoutesUsuario();
  }

  private Middleware(): void {
    // somente usuarios podem abrir chamados
    this.App.use(Authentication.authUsuario);
  }

  private RoutesUsuario(): void {
    this.App.post("/novochamado", Controller.create);
    this.App.get("/buscarchamado", Controller.find); // id pela query
  }

  private RoutesAdmin(): void {
    this.App.post(
      "/buscarchamadosemaberto",
      Authentication.authAdministrador,
      Controller.withResponsible
    );
  }
}

export default new Routes_chamdos().App;
