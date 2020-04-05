import { IStore } from "./index";
import { IActivityAction, ActionTypes } from "../actions";

const initialState: IStore["activity"] = {
  activities: [],
  activity: undefined,
  loadingInitial: false,
  submitting: false,
  target: "",
};

export default function (
  state: IStore["activity"] = initialState,
  action: IActivityAction
) {
  switch (action.type) {
    case ActionTypes.loadActivities:
      return { ...state, activities: action.payload };

    case ActionTypes.loadActivity:
      return {
        ...state,
        activity: action.payload,
      };

    case ActionTypes.clearActivity:
      return {
        ...state,
        activity: undefined,
      };

    case ActionTypes.createActivity:
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };

    case ActionTypes.editActivity:
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

    case ActionTypes.deleteActivity:
      const filteredActivities = state.activities.filter(
        (activity) => activity.id !== action.payload
      );

      return { ...state, activities: filteredActivities };

    case ActionTypes.setLoadingInitial:
      return { ...state, loadingInitial: action.payload };

    case ActionTypes.setSubmitting:
      return { ...state, submitting: action.payload };

    case ActionTypes.setTarget:
      return { ...state, target: action.payload };

    default:
      return state;
  }
}
