import { IStore } from "./index";
import { ActionTypes } from "../actions/types";
import { IUserActions } from "../actions/types/userActions";

const initialState: IStore["user"] = {
  user: null,
  isLoggedIn: false,
  error: null,
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

    case ActionTypes.MAIN_PHOTO:
      return {
        ...state,
        user: {
          username: state.user!.username,
          displayName: state.user!.displayName,
          token: state.user!.token,
          image: action.payload.url,
        },
      };

    default:
      return state;
  }
}
