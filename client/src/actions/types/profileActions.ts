import { IProfile } from "../../models/profile";
import { IPhoto } from "./../../models/profile";
import { ActionTypes } from ".";

export type IProfileActions =
  | ISetCurrentProfileAction
  | IEditProfileAction
  | IUploadedPhotoAction
  | IMainPhotoAction
  | IUpdateProfilePhotosAction
  | ISetProfileLoadingStatusAction
  | ISetUploadingStatusAction
  | ISetPhotoOperationStatusAction;

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

export interface ISetProfileLoadingStatusAction {
  type: ActionTypes.PROFILE_LOADING_STATUS;
  payload: boolean;
}

export interface ISetUploadingStatusAction {
  type: ActionTypes.UPLOADING_STATUS;
  payload: boolean;
}

export interface ISetPhotoOperationStatusAction {
  type: ActionTypes.PHOTO_OPERATION_STATUS;
  payload: boolean;
}
