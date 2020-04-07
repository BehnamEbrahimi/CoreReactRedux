import { IStore } from "./index";
import { ActionTypes } from "../actions/types";
import { IActivityActions } from "../actions/types/activityActions";

const initialState: IStore["activity"] = {
  activities: [],
  activity: undefined,
  loadingInitial: false,
  loading: false,
  submitting: false,
  target: "",
};

export default function (
  state = initialState,
  action: IActivityActions
): IStore["activity"] {
  switch (action.type) {
    case ActionTypes.ACTIVITIES_LIST:
      return { ...state, activities: action.payload };

    case ActionTypes.ACTIVITY:
      return {
        ...state,
        activity: action.payload,
      };

    case ActionTypes.NEW_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload],
        activity: action.payload,
      };

    case ActionTypes.EDIT_ACTIVITY:
      return {
        ...state,
        activities: [
          ...state.activities.filter(
            (activity) => activity.id !== action.payload.id
          ),
          action.payload.updatedActivity,
        ],
        activity: action.payload.updatedActivity,
      };

    case ActionTypes.DELETE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.id !== action.payload
        ),
        activity: undefined,
      };

    case ActionTypes.LOADING_STATUS:
      return { ...state, loading: action.payload };

    case ActionTypes.INITIAL_LOADING_STATUS:
      return { ...state, loadingInitial: action.payload };

    case ActionTypes.SUBMITTING_STATUS:
      return { ...state, submitting: action.payload };

    case ActionTypes.TARGET:
      return { ...state, target: action.payload };

    default:
      return state;
  }
}
