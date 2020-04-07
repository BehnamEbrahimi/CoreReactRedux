import { ActionTypes } from "./types";
import { ISetTokenAction, ISetAppLoadedAction } from "./types/appActions";

// Set Token
export type ISetToken = (token: string | null) => void;
export const setToken = (token: string | null): ISetTokenAction => {
  if (token) {
    window.localStorage.setItem("jwt", token);
  } else {
    window.localStorage.removeItem("jwt");
  }

  return {
    type: ActionTypes.TOKEN,
    payload: token,
  };
};

// Set App Loaded
export type ISetAppLoaded = () => void;
export const setAppLoaded = (): ISetAppLoadedAction => ({
  type: ActionTypes.APP_LOADED_STATUS,
});
