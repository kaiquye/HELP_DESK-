import Cors from "cors";

const ConfigCors = () => {
  /**
   * @description Config cors acess.
   */
  const Config = {
    origin: "*",
    methods: "GET,POST",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  };
  /**
   * @description  cors ja configurada.
   */
  return Cors(Config);
};
export default ConfigCors;
