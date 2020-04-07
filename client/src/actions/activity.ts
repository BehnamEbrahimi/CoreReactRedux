import { Dispatch } from "redux";
import { toast } from "react-toastify";

import agent from "../apis/agent";
import { history } from "./../index";
import { IActivity } from "../models/activity";
import { IStore } from "./../reducers/index";
import { ActionTypes } from "./types";
import {
  ILoadActivitiesAction,
  ILoadActivityAction,
  ICreateActivityAction,
  IEditActivityAction,
  IDeleteActivityAction,
  ISetLoadingAction,
  ISetLoadingInitialAction,
  ISetSubmittingAction,
  ISetTargetAction,
} from "./types/activityActions";
import { setActivityProps } from "../utils/setActivityProps";
import { createAttendee } from "../utils/createAttendee";

// Load Activities
export type ILoadActivities = () => void;
export const loadActivities = () => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  dispatch(setLoadingInitial(true));

  try {
    const activities = await agent.Activities.list();

    activities.forEach((activity) => {
      setActivityProps(activity, getState().user.user!);
    });

    dispatch<ILoadActivitiesAction>({
      type: ActionTypes.ACTIVITIES_LIST,
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
export const loadActivity = (id: string) => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  const activity = getState().activity.activities.find(
    (activity) => activity.id === id
  );
  if (activity) {
    dispatch<ILoadActivityAction>({
      type: ActionTypes.ACTIVITY,
      payload: activity,
    });
  } else {
    dispatch(setLoadingInitial(true));
    try {
      const activity = await agent.Activities.details(id);

      setActivityProps(activity, getState().user.user!);

      dispatch<ILoadActivityAction>({
        type: ActionTypes.ACTIVITY,
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

// Create Activity
export type ICreateActivity = (newActivity: IActivity) => void;
export const createActivity = (newActivity: IActivity) => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  dispatch(setSubmitting(true));
  dispatch(setTarget("submit"));

  try {
    await agent.Activities.create(newActivity);

    const attendee = createAttendee(getState().user.user!);
    attendee.isHost = true;
    const attendees = [];
    attendees.push(attendee);
    newActivity.attendees = attendees;
    newActivity.isHost = true;

    dispatch<ICreateActivityAction>({
      type: ActionTypes.NEW_ACTIVITY,
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
export const editActivity = (id: string, updatedActivity: IActivity) => async (
  dispatch: Dispatch
) => {
  dispatch(setSubmitting(true));
  dispatch(setTarget("submit"));

  try {
    await agent.Activities.update(updatedActivity);

    dispatch<IEditActivityAction>({
      type: ActionTypes.EDIT_ACTIVITY,
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
export const deleteActivity = (id: string) => async (dispatch: Dispatch) => {
  dispatch(setSubmitting(true));
  dispatch(setTarget(id));

  try {
    await agent.Activities.delete(id);

    dispatch<IDeleteActivityAction>({
      type: ActionTypes.DELETE_ACTIVITY,
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

// Attend an Activity
export type IAttendActivity = () => void;
export const attendActivity = () => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  dispatch(setLoading(true));

  const attendee = createAttendee(getState().user.user!);
  const activity = getState().activity.activity!;

  // if using push, the array is mutated and redux does not notify react to rerender
  // IMPORTANT: redux performs shallow-compare
  activity.attendees = [...activity.attendees, attendee];
  activity.isGoing = true;

  try {
    await agent.Activities.attend(activity.id);

    dispatch<IEditActivityAction>({
      type: ActionTypes.EDIT_ACTIVITY,
      payload: { id: activity.id, updatedActivity: activity },
    });

    dispatch(setLoading(false));
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setLoading(false));
    toast.error("Problem signing up to activity");
  }
};

// Un-Attend an Activity
export type IUnattendActivity = () => void;
export const unattendActivity = () => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  dispatch(setLoading(true));

  const user = getState().user.user!;
  const activity = getState().activity.activity!;

  activity.attendees = activity.attendees.filter(
    (attendee) => attendee.username !== user.username
  );
  activity.isGoing = false;

  try {
    await agent.Activities.unattend(activity.id);

    dispatch<IEditActivityAction>({
      type: ActionTypes.EDIT_ACTIVITY,
      payload: { id: activity.id, updatedActivity: activity },
    });

    dispatch(setLoading(false));
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setLoading(false));
    toast.error("Problem cancelling attendance");
  }
};

// Set Loading
export type ISetLoading = (loading: boolean) => void;
export const setLoading = (loading: boolean): ISetLoadingAction => ({
  type: ActionTypes.LOADING_STATUS,
  payload: loading,
});

// Set Initial Loading
export type ISetLoadingInitial = (loadingInitial: boolean) => void;
export const setLoadingInitial = (
  loadingInitial: boolean
): ISetLoadingInitialAction => ({
  type: ActionTypes.INITIAL_LOADING_STATUS,
  payload: loadingInitial,
});

// Set Submitting
export type ISetSubmitting = (submitting: boolean) => void;
export const setSubmitting = (submitting: boolean): ISetSubmittingAction => ({
  type: ActionTypes.SUBMITTING_STATUS,
  payload: submitting,
});

// Set Target
export type ISetTarget = (target: string) => void;
export const setTarget = (target: string): ISetTargetAction => ({
  type: ActionTypes.TARGET,
  payload: target,
});
