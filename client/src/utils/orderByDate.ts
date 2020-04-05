import { IActivity } from "./../models/activity";

export const orderByDate = (activities: IActivity[]): IActivity[] => {
  return activities.sort((a, b) => a.date.getTime() - b.date.getTime());
};
