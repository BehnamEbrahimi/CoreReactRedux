import { IActivity } from "../../models/activity";
import { ActionTypes } from ".";

export type IActivityActions =
  | ILoadActivitiesAction
  | ILoadActivityAction
  | ICreateActivityAction
  | IEditActivityAction
  | IDeleteActivityAction
  | ISetActivityLoadingStatusAction
  | ISetActivitiesLoadingStatusAction
  | ISetActivitySubmittingStatusAction
  | ISetTargetActvityAction;

export interface ILoadActivitiesAction {
  type: ActionTypes.ACTIVITIES_LIST;
  payload: IActivity[];
}

export interface ILoadActivityAction {
  type: ActionTypes.CURRENT_ACTIVITY;
  payload: IActivity;
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

export interface ISetActivityLoadingStatusAction {
  type: ActionTypes.ACTIVITY_LOADING_STATUS;
  payload: boolean;
}

export interface ISetActivitiesLoadingStatusAction {
  type: ActionTypes.ACTIVITIES_LOADING_STATUS;
  payload: boolean;
}

export interface ISetActivitySubmittingStatusAction {
  type: ActionTypes.ACTIVITY_SUBMITTING_STATUS;
  payload: boolean;
}

export interface ISetTargetActvityAction {
  type: ActionTypes.TARGET_ACTIVITY;
  payload: string;
}
