import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
} from "@microsoft/signalr";
import { IComment } from "./../models/activity";

export const establishChatHubConnection = async (
  activityId: string,
  token: string,
  onJoinedOrLeft: (message: string) => any,
  onReceiveComment: (comment: IComment) => any
): Promise<HubConnection | null> => {
  const chatHubConnection = new HubConnectionBuilder()
    .withUrl("http://localhost:5000/chat", {
      accessTokenFactory: () => token,
    })
    .configureLogging(LogLevel.Information)
    .build();

  try {
    console.log("Attempting to connect...");
    await chatHubConnection.start();
    console.log(chatHubConnection.state);

    console.log("Attempting to join group...");
    await chatHubConnection.invoke("AddToGroup", activityId);
    console.log(`Joined to group ${activityId}`);

    chatHubConnection.on("JoinedOrLeft", onJoinedOrLeft);
    chatHubConnection.on("ReceiveComment", onReceiveComment);
  } catch (ex) {
    ex.response && console.log(ex.response.data);
    return null;
  }

  return chatHubConnection;
};
