import { AxiosResponse } from "axios";
import { ActionTypes } from ".";
import { IUser } from "../../models/user";
import { IMainPhotoAction } from "./profileActions";

export type IUserActions =
  | ISetUserAction
  | ISetAuthErrorAction
  | IMainPhotoAction;

export interface ISetUserAction {
  type: ActionTypes.USER;
  payload: IUser | null;
}

export interface ISetAuthErrorAction {
  type: ActionTypes.AUTH_ERROR;
  payload: AxiosResponse | null;
}
