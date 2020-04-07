import { IStore } from "./index";
import { ActionTypes } from "../actions/types";
import { IModalActions } from "../actions/types/modalActions";

const initialState: IStore["modal"] = {
  open: false,
  body: null,
};

export default function (
  state: IStore["modal"] = initialState,
  action: IModalActions
) {
  switch (action.type) {
    case ActionTypes.OPEN_MODAL:
      return { ...state, open: true, body: action.payload };

    case ActionTypes.CLOSE_MODAL:
      return { ...state, open: false, body: null };

    default:
      return state;
  }
}
