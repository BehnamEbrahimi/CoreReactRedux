import { IStore } from "./index";
import { ActionTypes } from "../actions/types";
import { IProfileActions } from "../actions/types/profileActions";

const initialState: IStore["profile"] = {
  profile: null,
  loadingProfile: true,
  loading: false,
  uploadingPhoto: false,
  isCurrentUser: false,
};

export default function (
  state = initialState,
  action: IProfileActions
): IStore["profile"] {
  switch (action.type) {
    case ActionTypes.CURRENT_PROFILE:
      return {
        ...state,
        profile: action.payload.profile,
        isCurrentUser: action.payload.isCurrentUser,
      };

    case ActionTypes.UPLOADED_PHOTO:
      return {
        ...state,
        profile: {
          username: state.profile!.username,
          displayName: state.profile!.displayName,
          bio: state.profile!.bio,
          image: state.profile!.image,
          photos: [...state.profile!.photos, action.payload],
        },
      };

    case ActionTypes.UPDATE_PROFILE_PHOTOS:
      return {
        ...state,
        profile: {
          username: state.profile!.username,
          displayName: state.profile!.displayName,
          bio: state.profile!.bio,
          image: state.profile!.image,
          photos: action.payload,
        },
      };

    case ActionTypes.MAIN_PHOTO:
      return {
        ...state,
        profile: {
          username: state.profile!.username,
          displayName: state.profile!.displayName,
          bio: state.profile!.bio,
          image: action.payload.url,
          photos: state.profile!.photos,
        },
      };

    case ActionTypes.PROFILE_LOADING_STATUS:
      return { ...state, loadingProfile: action.payload };

    case ActionTypes.UPLOADING_STATUS:
      return { ...state, uploadingPhoto: action.payload };

    case ActionTypes.PHOTO_OPERATION_STATUS:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}
