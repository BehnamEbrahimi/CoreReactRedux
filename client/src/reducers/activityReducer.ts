import { IStore } from './index';
import { IActivityAction, ActionTypes } from '../actions';
import { orderByDate } from '../utils/orderByDate';

const initialState: IStore['activity'] = {
  activities: [],
  selectedActivity: undefined,
  editMode: false,
  loadingInitial: false,
  submitting: false,
  target: ''
};

export default function(
  state: IStore['activity'] = initialState,
  action: IActivityAction
) {
  switch (action.type) {
    case ActionTypes.loadActivities:
      return { ...state, activities: orderByDate(action.payload) };

    case ActionTypes.selectActivity:
      return {
        ...state,
        selectedActivity: state.activities.find(
          activity => activity.id === action.payload
        ),
        editMode: false
      };

    case ActionTypes.createActivity:
      return {
        ...state,
        activities: orderByDate([...state.activities, action.payload]),
        selectedActivity: action.payload,
        editMode: false
      };

    case ActionTypes.editActivity:
      return {
        ...state,
        activities: orderByDate([
          ...state.activities.filter(
            activity => activity.id !== action.payload.id
          ),
          action.payload.updatedActivity
        ]),
        selectedActivity: action.payload.updatedActivity,
        editMode: false
      };

    case ActionTypes.deleteActivity:
      const filteredActivities = state.activities.filter(
        activity => activity.id !== action.payload
      );

      return { ...state, activities: filteredActivities };

    case ActionTypes.openCreateForm:
      return { ...state, selectedActivity: undefined, editMode: true };

    case ActionTypes.setEditMode:
      return { ...state, editMode: action.payload };

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
