import { AxiosResponse } from "axios";
import { HubConnection } from "@microsoft/signalr";
import { combineReducers } from "redux";
import { IUser } from "./../models/user";
import { IProfile, IUserActivity } from "./../models/profile";
import { IActivity, IActivityFilter } from "../models/activity";
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
    follows: IProfile[];
    activeTab: string;
    userActivities: IUserActivity[];
    loadingActivities: boolean;
  };
  activity: {
    activities: IActivity[];
    activity: IActivity | null;
    chatHubConnection: HubConnection | null;
    loadingInitial: boolean;
    loading: boolean;
    submitting: boolean;
    target: string;
    activityCount: number;
    page: number;
    totalPages: number;
    filter: IActivityFilter;
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
