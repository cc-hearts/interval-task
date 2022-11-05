import { Get } from "../../utils/request";
import type { taskInterface } from "./type";
export function getList() {
  return Get<{ list: Array<taskInterface>; total: number }>(
    "api/interval/getIntervalById",
    {},
    {
      headers: {
        token: "de99c4d14c1d2ac6cee95b344abf91fb",
      },
    }
  );
}
