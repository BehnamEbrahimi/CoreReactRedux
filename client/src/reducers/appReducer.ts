import { IStore } from "./index";
import { ActionTypes } from "../actions/types";
import { IAppActions } from "../actions/types/appActions";

const initialState: IStore["app"] = {
  token: null,
  appLoaded: false,
};

export default function (
  state: IStore["app"] = initialState,
  action: IAppActions
) {
  switch (action.type) {
    case ActionTypes.APP_LOADED_STATUS:
      return { ...state, appLoaded: true };

    case ActionTypes.TOKEN:
      return { ...state, token: action.payload };

    default:
      return state;
  }
}
