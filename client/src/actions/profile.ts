import { Dispatch } from "redux";
import { toast } from "react-toastify";

import agent from "../apis/agent";
import { IPhoto } from "../models/profile";
import { IStore } from "./../reducers/index";
import { ActionTypes } from "./types";
import {
  ISetCurrentProfileAction,
  ISetProfileLoadingStatusAction,
  ISetUploadingStatusAction,
  ISetPhotoOperationStatusAction,
  IMainPhotoAction,
  IUploadedPhotoAction,
  IUpdateProfilePhotosAction,
} from "./types/profileActions";

// Load Profile
export type ILoadProfile = (username: string) => void;
export const loadProfile = (username: string) => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  dispatch(setProfileLoadingStatus(true));
  try {
    const profile = await agent.Profiles.get(username);

    dispatch<ISetCurrentProfileAction>({
      type: ActionTypes.CURRENT_PROFILE,
      payload: {
        profile,
        isCurrentUser: getState().user.user!.username === username,
      },
    });

    dispatch(setProfileLoadingStatus(false));
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setProfileLoadingStatus(false));
  }
};

// Upload Photo
export type IUploadPhoto = (file: Blob) => void;
export const uploadPhoto = (file: Blob) => async (dispatch: Dispatch) => {
  dispatch(setUploadingStatus(true));
  try {
    const photo = await agent.Profiles.uploadPhoto(file);

    dispatch<IUploadedPhotoAction>({
      type: ActionTypes.UPLOADED_PHOTO,
      payload: photo,
    });

    if (photo.isMain) {
      dispatch<IMainPhotoAction>({
        type: ActionTypes.MAIN_PHOTO,
        payload: photo,
      });
    }

    dispatch(setUploadingStatus(false));
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setUploadingStatus(false));
    toast.error("Problem uploading photo");
  }
};

// Set Main Photo
export type ISetMainPhoto = (photo: IPhoto) => void;
export const setMainPhoto = (photo: IPhoto) => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  dispatch(setPhotoOperationStatus(true));
  try {
    await agent.Profiles.setMainPhoto(photo.id);

    dispatch<IMainPhotoAction>({
      type: ActionTypes.MAIN_PHOTO,
      payload: photo,
    });

    const profilePhotos = getState().profile.profile!.photos;
    profilePhotos.find((p) => p.isMain)!.isMain = false;
    profilePhotos.find((p) => p.id === photo.id)!.isMain = true;

    dispatch<IUpdateProfilePhotosAction>({
      type: ActionTypes.UPDATE_PROFILE_PHOTOS,
      payload: [...profilePhotos],
    });

    dispatch(setPhotoOperationStatus(false));
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setPhotoOperationStatus(false));
    toast.error("Problem setting photo as main");
  }
};

// Delete Photo
export type IDeletePhoto = (photo: IPhoto) => void;
export const deletePhoto = (photo: IPhoto) => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  dispatch(setPhotoOperationStatus(true));
  try {
    await agent.Profiles.deletePhoto(photo.id);

    const profilePhotos = getState().profile.profile!.photos.filter(
      (p) => p.id !== photo.id
    );

    dispatch<IUpdateProfilePhotosAction>({
      type: ActionTypes.UPDATE_PROFILE_PHOTOS,
      payload: [...profilePhotos],
    });

    dispatch(setPhotoOperationStatus(false));
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setPhotoOperationStatus(false));
    toast.error("Problem deleting the photo");
  }
};

// Set Profile Loading Status
export type ISetProfileLoadingStatus = (loadingProfile: boolean) => void;
export const setProfileLoadingStatus = (
  loadingProfile: boolean
): ISetProfileLoadingStatusAction => ({
  type: ActionTypes.PROFILE_LOADING_STATUS,
  payload: loadingProfile,
});

// Set Uploading Status
export type ISetUploadingStatus = (uploading: boolean) => void;
export const setUploadingStatus = (
  uploading: boolean
): ISetUploadingStatusAction => ({
  type: ActionTypes.UPLOADING_STATUS,
  payload: uploading,
});

// Set Submitting
export type ISetPhotoOperationStatus = (loading: boolean) => void;
export const setPhotoOperationStatus = (
  loading: boolean
): ISetPhotoOperationStatusAction => ({
  type: ActionTypes.PHOTO_OPERATION_STATUS,
  payload: loading,
});
