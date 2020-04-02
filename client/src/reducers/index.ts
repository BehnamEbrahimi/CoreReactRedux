import { combineReducers } from 'redux';
import { IActivity } from '../models/activity';
import activityReducer from './activityReducer';

export interface IStore {
  activity: {
    activities: IActivity[];
    selectedActivity: IActivity | undefined;
    editMode: boolean;
    loadingInitial: boolean;
    submitting: boolean;
    target: string;
  };
}
export default combineReducers<IStore>({
  activity: activityReducer
});
