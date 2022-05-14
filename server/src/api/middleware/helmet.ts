import Helmet from "helmet";

const HelmetConfig = function () {
  return Helmet({ referrerPolicy: { policy: "no-referrer" } }); // adcionar mais confiurações
};

export default HelmetConfig;
