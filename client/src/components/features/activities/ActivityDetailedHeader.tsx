import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { format } from "date-fns";
import { IActivity } from "../../../models/activity";
import {
  attendActivity,
  IAttendActivity,
  unattendActivity,
  IUnattendActivity,
} from "../../../actions";
import { IStore } from "../../../reducers";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const ActivityDetailedHeader: React.FC<{
  attendActivity: IAttendActivity;
  unattendActivity: IUnattendActivity;
  loading: boolean;
  activity: IActivity;
}> = ({ attendActivity, unattendActivity, loading, activity }) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{format(activity.date, "eeee do MMM")}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost ? (
          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            color="orange"
            floated="right"
          >
            Manage Event
          </Button>
        ) : activity.isGoing ? (
          <Button loading={loading} onClick={unattendActivity}>
            Cancel attendance
          </Button>
        ) : (
          <Button loading={loading} onClick={attendActivity} color="teal">
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

const mapStateToProps = ({ activity: { loading } }: IStore) => ({ loading });

export default connect(mapStateToProps, { attendActivity, unattendActivity })(
  ActivityDetailedHeader
);
