import { AxiosResponse } from "axios";
import { ActionTypes } from ".";
import { IUser } from "../../models/user";

export type IUserActions = ISetUserAction | ISetAuthErrorAction;

export interface ISetUserAction {
  type: ActionTypes.USER;
  payload: IUser | null;
}

export interface ISetAuthErrorAction {
  type: ActionTypes.AUTH_ERROR;
  payload: AxiosResponse | null;
}
