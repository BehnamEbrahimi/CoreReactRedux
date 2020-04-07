import { IStore } from "./index";
import { ActionTypes } from "../actions/types";
import { IUserActions } from "../actions/types/userActions";

const initialState: IStore["user"] = {
  user: null,
  isLoggedIn: false,
  error: null,
};

export default function (
  state: IStore["user"] = initialState,
  action: IUserActions
) {
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

    default:
      return state;
  }
}
