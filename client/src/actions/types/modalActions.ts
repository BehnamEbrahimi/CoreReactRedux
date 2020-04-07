import { ActionTypes } from ".";

export type IModalActions = IOpenModalAction | ICloseModalAction;

export interface IOpenModalAction {
  type: ActionTypes.OPEN_MODAL;
  payload: any;
}

export interface ICloseModalAction {
  type: ActionTypes.CLOSE_MODAL;
}
