import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Item, Button, Label, Segment } from 'semantic-ui-react';

import { IActivity } from '../../../models/activity';
import { deleteActivity, IDeleteActivity } from '../../../actions';
import { IStore } from '../../../reducers';

interface IProps {
  deleteActivity: IDeleteActivity;
  activities: IActivity[];
  submitting: boolean;
  target: string;
}

const ActivityList: React.FC<IProps> = ({
  deleteActivity,
  activities,
  submitting,
  target
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/activities/${activity.id}`}
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() => deleteActivity(activity.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                  loading={submitting && target === activity.id}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

const mapStateToProps = ({
  activity: { activities, submitting, target }
}: IStore): {
  activities: IActivity[];
  submitting: boolean;
  target: string;
} => {
  return { activities, submitting, target };
};

export default connect(mapStateToProps, {
  deleteActivity
})(ActivityList);
