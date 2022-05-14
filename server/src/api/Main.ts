const express = require("express");
import ConfigCors from "./middleware/Cors";
import Routes_Administrador from "./routes/administrador";
import Routes_Chamados from "./routes/chamados";
import HelmetConfig from "./middleware/helmet";

class Main {
  public App;

  public constructor() {
    this.App = express();
    this.Middleware();
    this.Routes();
  }

  private Middleware(): void {
    this.App.use(express.json());
    this.App.use(ConfigCors());
    this.App.use(HelmetConfig());
  }

  private Routes(): void {
    this.App.use("/administrador", Routes_Administrador);
    this.App.use("/chamados", Routes_Chamados);
  }
}
module.exports = new Main().App;
