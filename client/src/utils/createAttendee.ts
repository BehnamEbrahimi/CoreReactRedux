import { IUser } from "../models/user";
import { IAttendee } from "../models/activity";

export const createAttendee = (user: IUser): IAttendee => {
  return {
    displayName: user.displayName,
    isHost: false,
    isFollowed: false,
    username: user.username,
    image: user.image!,
  };
};
