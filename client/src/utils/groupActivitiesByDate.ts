import { orderByDate } from "./orderByDate";
import { IActivity } from "./../models/activity";

interface IGroupObject {
  [key: string]: IActivity[];
}

export const groupActivitiesByDate = (
  activities: IActivity[]
): [string, IActivity[]][] => {
  const sortedActivities = orderByDate(activities);

  return Object.entries(
    sortedActivities.reduce((accumulator, activity) => {
      const date = activity.date.toISOString().split("T")[0];

      accumulator[date] = accumulator[date]
        ? [...accumulator[date], activity]
        : [activity];

      return accumulator;
    }, {} as IGroupObject)
  );
};
