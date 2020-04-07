import { IActivity } from "../../models/activity";
import { ActionTypes } from ".";

export type IActivityActions =
  | ILoadActivitiesAction
  | ILoadActivityAction
  | IClearActivityAction
  | ICreateActivityAction
  | IEditActivityAction
  | IDeleteActivityAction
  | ISetLoadingInitialAction
  | ISetSubmittingAction
  | ISetTargetAction;

export interface ILoadActivitiesAction {
  type: ActionTypes.ACTIVITIES_LIST;
  payload: IActivity[];
}

export interface ILoadActivityAction {
  type: ActionTypes.ACTIVITY;
  payload: IActivity;
}

export interface IClearActivityAction {
  type: ActionTypes.CLEAR_ACTIVITY;
}

export interface ICreateActivityAction {
  type: ActionTypes.NEW_ACTIVITY;
  payload: IActivity;
}

export interface IEditActivityAction {
  type: ActionTypes.EDIT_ACTIVITY;
  payload: { id: string; updatedActivity: IActivity };
}

export interface IDeleteActivityAction {
  type: ActionTypes.DELETE_ACTIVITY;
  payload: string;
}

export interface ISetLoadingInitialAction {
  type: ActionTypes.INITIAL_LOADING_STATUS;
  payload: boolean;
}

export interface ISetSubmittingAction {
  type: ActionTypes.SUBMITTING_STATUS;
  payload: boolean;
}

export interface ISetTargetAction {
  type: ActionTypes.TARGET;
  payload: string;
}
