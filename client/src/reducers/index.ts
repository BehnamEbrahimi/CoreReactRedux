import { IProfile } from "./../models/profile";
import { AxiosResponse } from "axios";
import { combineReducers } from "redux";
import { IUser } from "./../models/user";
import { IActivity } from "../models/activity";
import appReducer from "./appReducer";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import activityReducer from "./activityReducer";
import modalReducer from "./modalReducer";

export interface IStore {
  app: {
    token: string | null;
    appLoaded: boolean;
  };
  user: {
    user: IUser | null;
    isLoggedIn: boolean;
    error: AxiosResponse | null;
  };
  profile: {
    profile: IProfile | null;
    loadingProfile: boolean;
    loading: boolean;
    uploadingPhoto: boolean;
    isCurrentUser: boolean;
  };
  activity: {
    activities: IActivity[];
    activity: IActivity | null;
    loadingInitial: boolean;
    loading: boolean;
    submitting: boolean;
    target: string;
  };
  modal: {
    open: boolean;
    body: any;
  };
}
export default combineReducers<IStore>({
  app: appReducer,
  user: userReducer,
  profile: profileReducer,
  activity: activityReducer,
  modal: modalReducer,
});
