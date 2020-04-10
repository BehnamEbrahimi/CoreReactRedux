import { IStore } from "./index";
import { ActionTypes } from "../actions/types";
import { IActivityActions } from "../actions/types/activityActions";

const initialState: IStore["activity"] = {
  activities: [],
  activity: null,
  chatHubConnection: null,
  loadingInitial: false,
  loading: false,
  submitting: false,
  target: "",
  activityCount: 0,
  page: 0,
  totalPages: 0,
  filter: { all: true, isGoing: false, isHost: false, startDate: new Date() },
};

export default function (
  state = initialState,
  action: IActivityActions
): IStore["activity"] {
  switch (action.type) {
    case ActionTypes.ACTIVITIES_LIST:
      return {
        ...state,
        activities: [...state.activities, ...action.payload.activities],
        activityCount: action.payload.activityCount,
        totalPages: action.payload.totalPages,
      };

    case ActionTypes.EMPTY_ACTIVITIES:
      return {
        ...state,
        activities: [],
        page: 0,
      };

    case ActionTypes.CURRENT_ACTIVITY:
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
        activity: null,
      };

    case ActionTypes.CHAT_HUB_CONNECTION:
      return {
        ...state,
        chatHubConnection: action.payload,
      };

    case ActionTypes.NEW_COMMENT:
      return {
        ...state,
        activity: {
          ...state.activity!,
          comments: [...state.activity!.comments, action.payload],
        },
      };

    case ActionTypes.ACTIVITY_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case ActionTypes.ACTIVITY_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    case ActionTypes.ACTIVITY_LOADING_STATUS:
      return { ...state, loading: action.payload };

    case ActionTypes.ACTIVITIES_LOADING_STATUS:
      return { ...state, loadingInitial: action.payload };

    case ActionTypes.ACTIVITY_SUBMITTING_STATUS:
      return { ...state, submitting: action.payload };

    case ActionTypes.TARGET_ACTIVITY:
      return { ...state, target: action.payload };

    default:
      return state;
  }
}
