import { IStore } from "./index";
import { ActionTypes } from "../actions/types";
import { IProfileActions } from "../actions/types/profileActions";

const initialState: IStore["profile"] = {
  profile: null,
  loadingProfile: true,
  loading: false,
  uploadingPhoto: false,
  isCurrentUser: false,
  follows: [],
  activeTab: "about",
  userActivities: [],
  loadingActivities: false,
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

    case ActionTypes.EDIT_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile!,
          ...action.payload,
        },
      };

    case ActionTypes.UPLOADED_PHOTO:
      return {
        ...state,
        profile: {
          ...state.profile!,
          photos: [...state.profile!.photos, action.payload],
        },
      };

    case ActionTypes.MAIN_PHOTO:
      return {
        ...state,
        profile: {
          ...state.profile!,
          image: action.payload.url,
        },
      };

    case ActionTypes.UPDATE_PROFILE_PHOTOS:
      return {
        ...state,
        profile: {
          ...state.profile!,
          photos: action.payload,
        },
      };

    case ActionTypes.DELETE_PHOTO:
      return {
        ...state,
        profile: {
          ...state.profile!,
          photos: [
            ...state.profile!.photos.filter((p) => p.id !== action.payload),
          ],
        },
      };

    case ActionTypes.FOLLOW:
      return {
        ...state,
        profile: {
          ...state.profile!,
          isFollowed: true,
          followersCount: state.profile!.followersCount + 1,
        },
      };

    case ActionTypes.UNFOLLOW:
      return {
        ...state,
        profile: {
          ...state.profile!,
          isFollowed: false,
          followersCount: state.profile!.followersCount - 1,
        },
      };

    case ActionTypes.FOLLOWS:
      return {
        ...state,
        follows: action.payload,
      };

    case ActionTypes.ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };

    case ActionTypes.USER_ACTIVITIES:
      return {
        ...state,
        userActivities: action.payload,
      };

    case ActionTypes.PROFILE_LOADING_STATUS:
      return { ...state, loadingProfile: action.payload };

    case ActionTypes.UPLOADING_STATUS:
      return { ...state, uploadingPhoto: action.payload };

    case ActionTypes.PROFILE_OPERATION_STATUS:
      return { ...state, loading: action.payload };

    case ActionTypes.USER_ACTIVITIES_LOADING_STATUS:
      return { ...state, loadingActivities: action.payload };

    default:
      return state;
  }
}
