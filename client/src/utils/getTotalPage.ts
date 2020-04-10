import { LIMIT } from "../constants";

export const getTotalPage = (activityCount: number): number => {
  return Math.ceil(activityCount / LIMIT);
};
