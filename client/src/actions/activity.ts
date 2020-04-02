import { Dispatch } from 'redux';

import agent from '../apis/agent';
import { ActionTypes } from './types';
import { IActivity } from '../models/activity';

export type IActivityAction =
  | IFetchActivitiesAction
  | ICreateActivityAction
  | IEditActivityAction
  | IDeleteActivityAction
  | ISelectActivityAction
  | IOpenCreateFormAction
  | ISetEditModeAction
  | ISetLoadingAction
  | ISetSubmittingAction
  | ISetTargetAction;

// Fetch Activities
export type IFetchActivities = () => void;
export interface IFetchActivitiesAction {
  type: ActionTypes.fetchActivities;
  payload: IActivity[];
}
export const fetchActivities = () => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));

  const activities = await agent.Activities.list();

  activities.forEach(activity => {
    activity.date = activity.date.split('.')[0];
  });

  dispatch<IFetchActivitiesAction>({
    type: ActionTypes.fetchActivities,
    payload: activities
  });

  dispatch(setLoading(false));
};

// Create Activity
export type ICreateActivity = (newActivity: IActivity) => void;
export interface ICreateActivityAction {
  type: ActionTypes.createActivity;
  payload: IActivity;
}
export const createActivity = (newActivity: IActivity) => async (
  dispatch: Dispatch
) => {
  dispatch(setSubmitting(true));
  dispatch(setTarget('submit'));

  await agent.Activities.create(newActivity);

  dispatch<ICreateActivityAction>({
    type: ActionTypes.createActivity,
    payload: newActivity
  });

  dispatch(setSubmitting(false));
  dispatch(setTarget(''));
};

// Edit Activity
export type IEditActivity = (id: string, updatedActivity: IActivity) => void;
export interface IEditActivityAction {
  type: ActionTypes.editActivity;
  payload: { id: string; updatedActivity: IActivity };
}
export const editActivity = (id: string, updatedActivity: IActivity) => async (
  dispatch: Dispatch
) => {
  dispatch(setSubmitting(true));
  dispatch(setTarget('submit'));

  await agent.Activities.update(updatedActivity);

  dispatch<IEditActivityAction>({
    type: ActionTypes.editActivity,
    payload: { id, updatedActivity }
  });

  dispatch(setSubmitting(false));
  dispatch(setTarget(''));
};

// Delete Activity
export type IDeleteActivity = (id: string) => void;
export interface IDeleteActivityAction {
  type: ActionTypes.deleteActivity;
  payload: string;
}
export const deleteActivity = (id: string) => async (dispatch: Dispatch) => {
  dispatch(setSubmitting(true));
  dispatch(setTarget(id));

  await agent.Activities.delete(id);

  dispatch<IDeleteActivityAction>({
    type: ActionTypes.deleteActivity,
    payload: id
  });

  dispatch(setSubmitting(false));
  dispatch(setTarget(''));
};

// Select Activity
export type ISelectActivity = (id: string) => void;
export interface ISelectActivityAction {
  type: ActionTypes.selectActivity;
  payload: string;
}
export const selectActivity = (id: string): ISelectActivityAction => ({
  type: ActionTypes.selectActivity,
  payload: id
});

// Open Create Form
export type IOpenCreateForm = () => void;
export interface IOpenCreateFormAction {
  type: ActionTypes.openCreateForm;
}
export const openCreateForm = (): IOpenCreateFormAction => ({
  type: ActionTypes.openCreateForm
});

// Set Edit Mode
export type ISetEditMode = (editMode: boolean) => void;
export interface ISetEditModeAction {
  type: ActionTypes.setEditMode;
  payload: boolean;
}
export const setEditMode = (editMode: boolean): ISetEditModeAction => ({
  type: ActionTypes.setEditMode,
  payload: editMode
});

// Set Loading
export type ISetLoading = (loading: boolean) => void;
export interface ISetLoadingAction {
  type: ActionTypes.setLoading;
  payload: boolean;
}
export const setLoading = (loading: boolean): ISetLoadingAction => ({
  type: ActionTypes.setLoading,
  payload: loading
});

// Set Submitting
export type ISetSubmitting = (submitting: boolean) => void;
export interface ISetSubmittingAction {
  type: ActionTypes.setSubmitting;
  payload: boolean;
}
export const setSubmitting = (submitting: boolean): ISetSubmittingAction => ({
  type: ActionTypes.setSubmitting,
  payload: submitting
});

// Set Target
export type ISetTarget = (target: string) => void;
export interface ISetTargetAction {
  type: ActionTypes.setTarget;
  payload: string;
}
export const setTarget = (target: string): ISetTargetAction => ({
  type: ActionTypes.setTarget,
  payload: target
});
