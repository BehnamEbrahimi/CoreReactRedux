import { Dispatch } from "redux";
import { toast } from "react-toastify";

import agent from "../apis/agent";
import { history } from "./../index";
import { ActionTypes } from "./types";
import { IActivity } from "../models/activity";
import { IStore } from "./../reducers/index";

export type IActivityAction =
  | ILoadActivitiesAction
  | ILoadActivityAction
  | IClearActivityAction
  | ICreateActivityAction
  | IEditActivityAction
  | IDeleteActivityAction
  | ISetLoadingInitialAction
  | ISetSubmittingAction
  | ISetTargetAction;

// Load Activities
export type ILoadActivities = () => void;
export interface ILoadActivitiesAction {
  type: ActionTypes.loadActivities;
  payload: IActivity[];
}
export const loadActivities = () => async (dispatch: Dispatch) => {
  dispatch(setLoadingInitial(true));

  try {
    const activities = await agent.Activities.list();

    activities.forEach((activity) => {
      activity.date = new Date(activity.date);
    });

    dispatch<ILoadActivitiesAction>({
      type: ActionTypes.loadActivities,
      payload: activities,
    });
    dispatch(setLoadingInitial(false));
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setLoadingInitial(false));
    toast.error("Error!");
  }
};

// Load Activity
export type ILoadActivity = (id: string) => void;
export interface ILoadActivityAction {
  type: ActionTypes.loadActivity;
  payload: IActivity;
}
export const loadActivity = (id: string) => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  const activity = getState().activity.activities.find(
    (activity) => activity.id === id
  );
  if (activity) {
    dispatch<ILoadActivityAction>({
      type: ActionTypes.loadActivity,
      payload: activity,
    });
  } else {
    dispatch(setLoadingInitial(true));
    try {
      const activity = await agent.Activities.details(id);

      activity.date = new Date(activity.date);

      dispatch<ILoadActivityAction>({
        type: ActionTypes.loadActivity,
        payload: activity,
      });
      dispatch(setLoadingInitial(false));
    } catch (ex) {
      ex.response && console.log(ex.response.data);
      dispatch(setLoadingInitial(false));
      toast.error("Error!");
    }
  }
};

// Clear Activity
export type IClearActivity = () => void;
export interface IClearActivityAction {
  type: ActionTypes.clearActivity;
}
export const clearActivity = (): IClearActivityAction => ({
  type: ActionTypes.clearActivity,
});

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
  dispatch(setTarget("submit"));

  try {
    await agent.Activities.create(newActivity);

    dispatch<ICreateActivityAction>({
      type: ActionTypes.createActivity,
      payload: newActivity,
    });
    dispatch(setSubmitting(false));
    dispatch(setTarget(""));

    history.push(`/activities/${newActivity.id}`);
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setSubmitting(false));
    dispatch(setTarget(""));
    toast.error("Error!");
  }
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
  dispatch(setTarget("submit"));

  try {
    await agent.Activities.update(updatedActivity);

    dispatch<IEditActivityAction>({
      type: ActionTypes.editActivity,
      payload: { id, updatedActivity },
    });
    dispatch(setSubmitting(false));
    dispatch(setTarget(""));

    history.push(`/activities/${updatedActivity.id}`);
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setSubmitting(false));
    dispatch(setTarget(""));
    toast.error("Error!");
  }
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

  try {
    await agent.Activities.delete(id);

    dispatch<IDeleteActivityAction>({
      type: ActionTypes.deleteActivity,
      payload: id,
    });
    dispatch(setSubmitting(false));
    dispatch(setTarget(""));
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setSubmitting(false));
    dispatch(setTarget(""));
    toast.error("Error!");
  }
};

// Set Loading
export type ISetLoadingInitial = (loadingInitial: boolean) => void;
export interface ISetLoadingInitialAction {
  type: ActionTypes.setLoadingInitial;
  payload: boolean;
}
export const setLoadingInitial = (
  loadingInitial: boolean
): ISetLoadingInitialAction => ({
  type: ActionTypes.setLoadingInitial,
  payload: loadingInitial,
});

// Set Submitting
export type ISetSubmitting = (submitting: boolean) => void;
export interface ISetSubmittingAction {
  type: ActionTypes.setSubmitting;
  payload: boolean;
}
export const setSubmitting = (submitting: boolean): ISetSubmittingAction => ({
  type: ActionTypes.setSubmitting,
  payload: submitting,
});

// Set Target
export type ISetTarget = (target: string) => void;
export interface ISetTargetAction {
  type: ActionTypes.setTarget;
  payload: string;
}
export const setTarget = (target: string): ISetTargetAction => ({
  type: ActionTypes.setTarget,
  payload: target,
});
