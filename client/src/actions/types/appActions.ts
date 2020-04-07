import { ActionTypes } from ".";

export type IAppActions = ISetTokenAction | ISetAppLoadedAction;

export interface ISetTokenAction {
  type: ActionTypes.TOKEN;
  payload: string | null;
}

export interface ISetAppLoadedAction {
  type: ActionTypes.APP_LOADED_STATUS;
}
