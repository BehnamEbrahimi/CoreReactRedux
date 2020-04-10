import { Dispatch } from "redux";
import { toast } from "react-toastify";

import agent from "../apis/agent";
import { IPhoto, IProfile } from "../models/profile";
import { IStore } from "./../reducers/index";
import { ActionTypes } from "./types";
import {
  ISetCurrentProfileAction,
  IEditProfileAction,
  IUploadedPhotoAction,
  IMainPhotoAction,
  IUpdateProfilePhotosAction,
  IDeletePhotoAction,
  IFollowAction,
  IUnfollowAction,
  IFollowsAction,
  IActiveTabAction,
  IUserActivitiesAction,
  ISetProfileLoadingStatusAction,
  ISetUploadingStatusAction,
  ISetProfileOperationStatusAction,
  ISetActivitiesLoadingStatusAction,
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

// Edit Profile
export type IEditProfile = (profile: Partial<IProfile>) => void;
export const editProfile = (profile: Partial<IProfile>) => async (
  dispatch: Dispatch
) => {
  try {
    await agent.Profiles.updateProfile(profile);

    dispatch<IEditProfileAction>({
      type: ActionTypes.EDIT_PROFILE,
      payload: profile,
    });
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    toast.error("Problem updating profile");
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
  dispatch(setProfileOperationStatus(true));
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

    dispatch(setProfileOperationStatus(false));
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setProfileOperationStatus(false));
    toast.error("Problem setting photo as main");
  }
};

// Delete Photo
export type IDeletePhoto = (photo: IPhoto) => void;
export const deletePhoto = (photo: IPhoto) => async (dispatch: Dispatch) => {
  dispatch(setProfileOperationStatus(true));
  try {
    await agent.Profiles.deletePhoto(photo.id);

    dispatch<IDeletePhotoAction>({
      type: ActionTypes.DELETE_PHOTO,
      payload: photo.id,
    });

    dispatch(setProfileOperationStatus(false));
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setProfileOperationStatus(false));
    toast.error("Problem deleting the photo");
  }
};

// Follow
export type IFollow = (username: string) => void;
export const follow = (username: string) => async (dispatch: Dispatch) => {
  dispatch(setProfileOperationStatus(true));
  try {
    await agent.Profiles.follow(username);

    dispatch<IFollowAction>({
      type: ActionTypes.FOLLOW,
    });

    dispatch(setProfileOperationStatus(false));
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setProfileOperationStatus(false));
    toast.error("Problem following user");
  }
};

// UnFollow
export type IUnfollow = (username: string) => void;
export const unfollow = (username: string) => async (dispatch: Dispatch) => {
  dispatch(setProfileOperationStatus(true));
  try {
    await agent.Profiles.unfollow(username);

    dispatch<IUnfollowAction>({
      type: ActionTypes.UNFOLLOW,
    });

    dispatch(setProfileOperationStatus(false));
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setProfileOperationStatus(false));
    toast.error("Problem unfollowing user");
  }
};

// Load Follows
export type ILoadFollows = (listOf: string) => void;
export const loadFollows = (listOf: string) => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  dispatch(setProfileOperationStatus(true));
  try {
    const profiles = await agent.Profiles.listFollows(
      getState().profile.profile!.username,
      listOf
    );

    dispatch<IFollowsAction>({
      type: ActionTypes.FOLLOWS,
      payload: profiles,
    });

    dispatch(setProfileOperationStatus(false));
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setProfileOperationStatus(false));
    toast.error("Problem loading follows");
  }
};

// Set Active Tab
export type ISetActiveTab = (tab: string) => void;
export const setActiveTab = (tab: string): IActiveTabAction => ({
  type: ActionTypes.ACTIVE_TAB,
  payload: tab,
});

// Load User Activities
export type ILoadUserActivities = (username: string, filter?: string) => void;
export const loadUserActivities = (username: string, filter?: string) => async (
  dispatch: Dispatch
) => {
  dispatch(setActivitiesLoadingStatus(true));
  try {
    const activities = await agent.Profiles.listActivities(username, filter!);

    dispatch<IUserActivitiesAction>({
      type: ActionTypes.USER_ACTIVITIES,
      payload: activities,
    });

    dispatch(setActivitiesLoadingStatus(false));
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setActivitiesLoadingStatus(false));
    toast.error("Problem loading activities");
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

// Set Operation Status
export type ISetProfileOperationStatus = (loading: boolean) => void;
export const setProfileOperationStatus = (
  loading: boolean
): ISetProfileOperationStatusAction => ({
  type: ActionTypes.PROFILE_OPERATION_STATUS,
  payload: loading,
});

// Set User Activities Loading Status
export type ISetActivitiesLoadingStatus = (loading: boolean) => void;
export const setActivitiesLoadingStatus = (
  loading: boolean
): ISetActivitiesLoadingStatusAction => ({
  type: ActionTypes.USER_ACTIVITIES_LOADING_STATUS,
  payload: loading,
});
