import { AxiosResponse } from "axios";
import { ActionTypes } from ".";
import { IUser } from "../../models/user";
import { IMainPhotoAction, IEditProfileAction } from "./profileActions";

export type IUserActions =
  | ISetUserAction
  | ISetAuthErrorAction
  | ISetFbLoginLoadingStatusAction
  | IMainPhotoAction
  | IEditProfileAction;

export interface ISetUserAction {
  type: ActionTypes.USER;
  payload: IUser | null;
}

export interface ISetAuthErrorAction {
  type: ActionTypes.AUTH_ERROR;
  payload: AxiosResponse | null;
}

export interface ISetFbLoginLoadingStatusAction {
  type: ActionTypes.FB_LOGIN_LOADING_STATUS;
  payload: boolean;
}
