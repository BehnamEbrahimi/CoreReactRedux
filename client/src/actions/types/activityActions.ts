import { HubConnection } from "@microsoft/signalr";
import { IActivity, IActivityFilter } from "../../models/activity";
import { IComment } from "./../../models/activity";
import { ActionTypes } from ".";

export type IActivityActions =
  | IEmptyActivitiesAction
  | ILoadActivitiesAction
  | ILoadActivityAction
  | ICreateActivityAction
  | IEditActivityAction
  | IDeleteActivityAction
  | ISetChatHubConnectionAction
  | INewCommentAction
  | IFilterAction
  | IActivityPageAction
  | ISetActivityLoadingStatusAction
  | ISetActivitiesLoadingStatusAction
  | ISetActivitySubmittingStatusAction
  | ISetTargetActvityAction;

export interface IEmptyActivitiesAction {
  type: ActionTypes.EMPTY_ACTIVITIES;
}

export interface ILoadActivitiesAction {
  type: ActionTypes.ACTIVITIES_LIST;
  payload: {
    activities: IActivity[];
    activityCount: number;
    totalPages: number;
  };
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

export interface ISetChatHubConnectionAction {
  type: ActionTypes.CHAT_HUB_CONNECTION;
  payload: HubConnection | null;
}

export interface INewCommentAction {
  type: ActionTypes.NEW_COMMENT;
  payload: IComment;
}

export interface IFilterAction {
  type: ActionTypes.ACTIVITY_FILTER;
  payload: IActivityFilter;
}

export interface IActivityPageAction {
  type: ActionTypes.ACTIVITY_PAGE;
  payload: number;
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
