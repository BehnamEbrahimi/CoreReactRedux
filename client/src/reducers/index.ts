import { combineReducers } from 'redux';
import { IActivity } from '../models/activity';
import activityReducer from './activityReducer';

export interface IStore {
  activity: {
    activities: IActivity[];
    activity: IActivity | undefined;
    loadingInitial: boolean;
    submitting: boolean;
    target: string;
  };
}
export default combineReducers<IStore>({
  activity: activityReducer
});
