import { AxiosResponse } from "axios";
import { Dispatch } from "redux";

import agent from "../apis/agent";
import { setToken, setAppLoaded } from "./app";
import { closeModal } from "./modal";
import { history } from "./../index";
import { ActionTypes } from "./types";
import { IUserFormValues } from "./../models/user";
import { IUser } from "../models/user";
import { ISetUserAction, ISetAuthErrorAction } from "./types/userActions";

// Register
export type IRegister = (userData: IUserFormValues) => void;
export const register = (userData: IUserFormValues) => async (
  dispatch: Dispatch
) => {
  dispatch(setAuthError(null));

  try {
    const user = await agent.User.register(userData);

    dispatch(setUser(user));

    dispatch(setToken(user.token));

    dispatch(closeModal());

    history.push("/activities");
  } catch (ex) {
    ex.response && dispatch(setAuthError(ex.response));
  }
};

// Get User
export type IGetUser = () => void;
export const getUser = () => async (dispatch: Dispatch) => {
  try {
    const user = await agent.User.current();

    dispatch(setUser(user));

    dispatch(setAppLoaded());
  } catch (ex) {
    ex.response && console.log(ex.response.data);
  }
};

// Login
export type ILogin = (userData: IUserFormValues) => void;
export const login = (userData: IUserFormValues) => async (
  dispatch: Dispatch
) => {
  dispatch(setAuthError(null));

  try {
    const user = await agent.User.login(userData);

    dispatch(setUser(user));

    dispatch(setToken(user.token));

    dispatch(closeModal());

    history.push("/activities");
  } catch (ex) {
    ex.response && dispatch(setAuthError(ex.response));
  }
};

// Logout
export type ILogout = () => void;
export const logout = () => (dispatch: Dispatch) => {
  dispatch(setUser(null));

  dispatch(setToken(null));

  history.push("/");
};

// Set User
export type ISetUser = (user: IUser | null) => void;
export const setUser = (user: IUser | null): ISetUserAction => ({
  type: ActionTypes.USER,
  payload: user,
});

// Set Auth Error
export type ISetAuthError = (err: AxiosResponse | null) => void;
export const setAuthError = (
  err: AxiosResponse | null
): ISetAuthErrorAction => ({
  type: ActionTypes.AUTH_ERROR,
  payload: err,
});
