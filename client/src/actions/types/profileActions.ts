import { IProfile, IUserActivity } from "../../models/profile";
import { IPhoto } from "./../../models/profile";
import { ActionTypes } from ".";

export type IProfileActions =
  | ISetCurrentProfileAction
  | IEditProfileAction
  | IUploadedPhotoAction
  | IMainPhotoAction
  | IUpdateProfilePhotosAction
  | IDeletePhotoAction
  | IFollowAction
  | IUnfollowAction
  | IFollowsAction
  | IActiveTabAction
  | IUserActivitiesAction
  | ISetProfileLoadingStatusAction
  | ISetUploadingStatusAction
  | ISetProfileOperationStatusAction
  | ISetActivitiesLoadingStatusAction;

export interface ISetCurrentProfileAction {
  type: ActionTypes.CURRENT_PROFILE;
  payload: { profile: IProfile | null; isCurrentUser: boolean };
}

export interface IEditProfileAction {
  type: ActionTypes.EDIT_PROFILE;
  payload: Partial<IProfile>;
}

export interface IUploadedPhotoAction {
  type: ActionTypes.UPLOADED_PHOTO;
  payload: IPhoto;
}

export interface IMainPhotoAction {
  type: ActionTypes.MAIN_PHOTO;
  payload: IPhoto;
}

export interface IUpdateProfilePhotosAction {
  type: ActionTypes.UPDATE_PROFILE_PHOTOS;
  payload: IPhoto[];
}

export interface IDeletePhotoAction {
  type: ActionTypes.DELETE_PHOTO;
  payload: string;
}

export interface IFollowAction {
  type: ActionTypes.FOLLOW;
}

export interface IUnfollowAction {
  type: ActionTypes.UNFOLLOW;
}

export interface IFollowsAction {
  type: ActionTypes.FOLLOWS;
  payload: IProfile[];
}

export interface IActiveTabAction {
  type: ActionTypes.ACTIVE_TAB;
  payload: string;
}

export interface IUserActivitiesAction {
  type: ActionTypes.USER_ACTIVITIES;
  payload: IUserActivity[];
}

export interface ISetProfileLoadingStatusAction {
  type: ActionTypes.PROFILE_LOADING_STATUS;
  payload: boolean;
}

export interface ISetUploadingStatusAction {
  type: ActionTypes.UPLOADING_STATUS;
  payload: boolean;
}

export interface ISetProfileOperationStatusAction {
  type: ActionTypes.PROFILE_OPERATION_STATUS;
  payload: boolean;
}

export interface ISetActivitiesLoadingStatusAction {
  type: ActionTypes.USER_ACTIVITIES_LOADING_STATUS;
  payload: boolean;
}
