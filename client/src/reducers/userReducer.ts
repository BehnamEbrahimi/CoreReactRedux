import { IStore } from "./index";
import { ActionTypes } from "../actions/types";
import { IUserActions } from "../actions/types/userActions";

const initialState: IStore["user"] = {
  user: null,
  isLoggedIn: false,
  error: null,
  loading: false,
};

export default function (
  state = initialState,
  action: IUserActions
): IStore["user"] {
  switch (action.type) {
    case ActionTypes.USER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: !!action.payload,
        error: null,
      };

    case ActionTypes.AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ActionTypes.FB_LOGIN_LOADING_STATUS:
      return {
        ...state,
        loading: action.payload,
      };

    case ActionTypes.MAIN_PHOTO:
      return {
        ...state,
        user: {
          ...state.user!,
          image: action.payload.url,
        },
      };

    case ActionTypes.EDIT_PROFILE:
      return {
        ...state,
        user: {
          ...state.user!,
          displayName: action.payload.displayName || state.user!.displayName,
        },
      };

    default:
      return state;
  }
}
