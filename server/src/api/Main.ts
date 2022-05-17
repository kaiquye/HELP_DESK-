const express = require("express");
import ConfigCors from "./middleware/Cors";
import Routes_Administrador from "./routes/administrador";
import Routes_Chamados from "./routes/chamados";
import Routes_Usuario from "./routes/usuario";
import Routes_Setor from "./routes/setor";
import HelmetConfig from "./middleware/helmet";
import { Response, Request, NextFunction, ErrorRequestHandler } from "express";

class Main {
  public App;

  public constructor() {
    this.App = express();
    this.Middleware();
    this.Routes();
    this.exceptionHandler();
  }

  private Middleware(): void {
    this.App.use(express.json());
    this.App.use(ConfigCors());
    this.App.use(HelmetConfig());
  }

  private Routes(): void {
    this.App.use("/administrador", Routes_Administrador);
    this.App.use("/chamado", Routes_Chamados);
    this.App.use("/usuario", Routes_Usuario);
    this.App.use("/setor", Routes_Setor);
  }
  private exceptionHandler() {
    this.App.use(
      async (
        err: any | ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV === "development") {
          return res.status(500).json({ testdasdasdasdasdase: err });
        }
        return res.status(500).json({ error: "Internal server error" });
      }
    );
  }
}
module.exports = new Main().App;
