import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { formatDistance } from "date-fns";

import TextAreaInput from "../../common/TextAreaInput";
import { IActivity } from "../../../models/activity";
import {
  createChatHubConnection,
  ICreateChatHubConnection,
  destroyChatHubConnection,
  IDestroyChatHubConnection,
  addComment,
  IAddComment,
} from "../../../actions";
import { IStore } from "../../../reducers";

interface IProps {
  createChatHubConnection: ICreateChatHubConnection;
  destroyChatHubConnection: IDestroyChatHubConnection;
  addComment: IAddComment;
  activity: IActivity;
}

const ActivityDetailedChat: React.FC<IProps> = ({
  createChatHubConnection,
  destroyChatHubConnection,
  addComment,
  activity,
}) => {
  useEffect(() => {
    createChatHubConnection(activity.id);
    return () => {
      destroyChatHubConnection(activity.id);
    };
  }, [createChatHubConnection, destroyChatHubConnection, activity.id]);

  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {activity &&
            activity.comments &&
            activity.comments.map((comment) => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.image || "/assets/user.png"} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.username}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>
                      {formatDistance(new Date(comment.createdAt), new Date())}
                    </div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}

          <FinalForm
            onSubmit={addComment}
            render={({ handleSubmit, submitting, form }) => (
              <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
                <Field
                  name="body"
                  component={TextAreaInput}
                  rows={2}
                  placeholder="Add your comment"
                />
                <Button
                  loading={submitting}
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                />
              </Form>
            )}
          />
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

const mapStateToProps = ({ activity: { activity } }: IStore) => ({
  activity: activity!,
});

export default connect(mapStateToProps, {
  createChatHubConnection,
  destroyChatHubConnection,
  addComment,
})(ActivityDetailedChat);
