import { Dispatch } from "redux";
import { toast } from "react-toastify";

import agent from "../apis/agent";
import { establishChatHubConnection } from "./../hubs/chat";
import { history } from "./../index";
import { IActivity } from "../models/activity";
import { IStore } from "./../reducers/index";
import { ActionTypes } from "./types";
import {
  IEmptyActivitiesAction,
  ILoadActivitiesAction,
  ILoadActivityAction,
  ICreateActivityAction,
  IEditActivityAction,
  IDeleteActivityAction,
  ISetChatHubConnectionAction,
  INewCommentAction,
  IFilterAction,
  IActivityPageAction,
  ISetActivityLoadingStatusAction,
  ISetActivitiesLoadingStatusAction,
  ISetActivitySubmittingStatusAction,
  ISetTargetActvityAction,
} from "./types/activityActions";
import { setActivityProps } from "../utils/setActivityProps";
import { createAttendee } from "../utils/createAttendee";
import { getAxiosParams } from "./../utils/getAxiosParams";
import { getTotalPage } from "./../utils/getTotalPage";

// Load Activities
export type ILoadActivities = () => void;
export const loadActivities = () => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  dispatch(setLoadingInitial(true));

  try {
    const params = getAxiosParams(
      getState().activity.page,
      getState().activity.filter
    );
    const {
      items: activities,
      totalItems: activityCount,
    } = await agent.Activities.list(params);

    activities.forEach((activity) => {
      setActivityProps(activity, getState().user.user!);
    });

    dispatch<ILoadActivitiesAction>({
      type: ActionTypes.ACTIVITIES_LIST,
      payload: {
        activities,
        activityCount,
        totalPages: getTotalPage(activityCount),
      },
    });
    dispatch(setLoadingInitial(false));
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    dispatch(setLoadingInitial(false));
    toast.error("Problem loading activities");
  }
};

// Empty Activities
export type IEmptyActivities = () => void;
export const emptyActivities = (): IEmptyActivitiesAction => ({
  type: ActionTypes.EMPTY_ACTIVITIES,
});

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
      type: ActionTypes.CURRENT_ACTIVITY,
      payload: activity,
    });
  } else {
    dispatch(setLoadingInitial(true));
    try {
      const activity = await agent.Activities.details(id);

      setActivityProps(activity, getState().user.user!);

      dispatch<ILoadActivityAction>({
        type: ActionTypes.CURRENT_ACTIVITY,
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
    newActivity.comments = [];
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

// Create Chat Hub Connection
export type ICreateChatHubConnection = (activityId: string) => void;
export const createChatHubConnection = (activityId: string) => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  const connection = await establishChatHubConnection(
    activityId,
    getState().user.user!.token,
    (message) => {
      toast.info(message);
    },
    (comment) => {
      dispatch<INewCommentAction>({
        type: ActionTypes.NEW_COMMENT,
        payload: comment,
      });
    }
  );

  if (connection) {
    dispatch<ISetChatHubConnectionAction>({
      type: ActionTypes.CHAT_HUB_CONNECTION,
      payload: connection,
    });
  }
};

// Destroy Chat Hub Connection
export type IDestroyChatHubConnection = (activityId: string) => void;
export const destroyChatHubConnection = (activityId: string) => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  try {
    await getState().activity.chatHubConnection?.invoke(
      "RemoveFromGroup",
      activityId
    );
    console.log(`Left from group ${activityId}`);

    await getState().activity.chatHubConnection?.stop();
    console.log("Connection stopped");

    dispatch<ISetChatHubConnectionAction>({
      type: ActionTypes.CHAT_HUB_CONNECTION,
      payload: null,
    });
  } catch (ex) {
    ex.response && console.log(ex.response.data);
  }
};

// Add Comment
export type IAddComment = (formData: any) => void;
export const addComment = (formData: any) => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  formData.id = getState().activity.activity!.id;

  try {
    await getState().activity.chatHubConnection!.invoke(
      "SendComment",
      formData
    );
  } catch (ex) {
    ex.response && console.log(ex.response.data);
  }
};

// Set Filter
export type ISetFilter = (filter: string, value: string | Date) => void;
export const setFilter = (filter: string, value: string | Date) => async (
  dispatch: Dispatch,
  getState: () => IStore
) => {
  dispatch(emptyActivities());

  let payload = {
    all: false,
    isGoing: false,
    isHost: false,
    startDate: getState().activity.filter.startDate,
  };

  if (filter === "startDate" && typeof value === "object") {
    dispatch<IFilterAction>({
      type: ActionTypes.ACTIVITY_FILTER,
      payload: { ...getState().activity.filter, [filter]: value },
    });
  } else {
    dispatch<IFilterAction>({
      type: ActionTypes.ACTIVITY_FILTER,
      payload: { ...payload, [filter]: value === "true" },
    });
  }
};

// Reset Filter
export type IResetFilters = () => void;
export const resetFilters = (): IFilterAction => ({
  type: ActionTypes.ACTIVITY_FILTER,
  payload: {
    all: true,
    isGoing: false,
    isHost: false,
    startDate: new Date(),
  },
});

// Set Page
export type ISetPage = (page: number) => void;
export const setPage = (page: number): IActivityPageAction => ({
  type: ActionTypes.ACTIVITY_PAGE,
  payload: page,
});

// Set Loading
export type ISetLoading = (loading: boolean) => void;
export const setLoading = (
  loading: boolean
): ISetActivityLoadingStatusAction => ({
  type: ActionTypes.ACTIVITY_LOADING_STATUS,
  payload: loading,
});

// Set Initial Loading
export type ISetLoadingInitial = (loadingInitial: boolean) => void;
export const setLoadingInitial = (
  loadingInitial: boolean
): ISetActivitiesLoadingStatusAction => ({
  type: ActionTypes.ACTIVITIES_LOADING_STATUS,
  payload: loadingInitial,
});

// Set Submitting
export type ISetSubmitting = (submitting: boolean) => void;
export const setSubmitting = (
  submitting: boolean
): ISetActivitySubmittingStatusAction => ({
  type: ActionTypes.ACTIVITY_SUBMITTING_STATUS,
  payload: submitting,
});

// Set Target
export type ISetTarget = (target: string) => void;
export const setTarget = (target: string): ISetTargetActvityAction => ({
  type: ActionTypes.TARGET_ACTIVITY,
  payload: target,
});
