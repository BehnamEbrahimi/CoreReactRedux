import { IActivity } from "./../models/activity";

export const orderByDate = (activities: IActivity[]): IActivity[] => {
  return activities.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
};
