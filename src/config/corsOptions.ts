import { whiteList } from "./whiteList";

export const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Domínio não autorizado"));
    }
  },
};
