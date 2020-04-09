import { IActivity } from "../models/activity";
import { IUser } from "../models/user";

export const setActivityProps = (activity: IActivity, user: IUser) => {
  activity.date = new Date(activity.date);
  activity.isGoing = activity.attendees.some(
    (a) => a.username === user.username
  );
  activity.isHost = activity.attendees.some(
    (a) => a.username === user.username && a.isHost
  );
  activity.comments = activity.comments.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  return activity;
};
