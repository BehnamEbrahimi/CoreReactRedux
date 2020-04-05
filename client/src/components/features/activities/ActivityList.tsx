import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Item, Label } from "semantic-ui-react";

import ActivityListItem from "./ActivityListItem";
import { IActivity } from "../../../models/activity";
import { IStore } from "../../../reducers";
import { groupActivitiesByDate } from "../../../utils/groupActivitiesByDate";

interface IProps {
  activities: IActivity[];
}

const ActivityList: React.FC<IProps> = ({ activities }) => {
  return (
    <Fragment>
      {groupActivitiesByDate(activities).map(([date, activitiesInEachDate]) => (
        <Fragment key={date}>
          <Label size="large" color="blue">
            {date}
          </Label>
          <Item.Group divided>
            {activitiesInEachDate.map((activity) => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

const mapStateToProps = ({
  activity: { activities },
}: IStore): {
  activities: IActivity[];
} => {
  return { activities };
};

export default connect(mapStateToProps, {})(ActivityList);
