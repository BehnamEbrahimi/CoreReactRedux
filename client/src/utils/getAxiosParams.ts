import { IActivityFilter } from "./../models/activity";
import { LIMIT } from "../constants";

export const getAxiosParams = (page: number, filter: IActivityFilter) => {
  const params = new URLSearchParams();

  params.append("limit", String(LIMIT));
  params.append("offset", `${page ? page * LIMIT : 0}`);

  for (let key in filter) {
    switch (key) {
      case "startDate":
        params.append(key, filter[key].toISOString());
        break;
      case "all":
      case "isHost":
      case "isGoing":
        params.append(key, filter[key].toString());
        break;
    }
  }

  return params;
};
