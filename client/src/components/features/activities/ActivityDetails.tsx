import React from 'react';
import { connect } from 'react-redux';
import { Card, Image, Button } from 'semantic-ui-react';

import { IActivity } from '../../../models/activity';
import {
  selectActivity,
  setEditMode,
  ISetEditMode,
  ISelectActivity
} from '../../../actions';
import { IStore } from '../../../reducers';

interface IProps {
  activity: IActivity;
  setEditMode: ISetEditMode;
  selectActivity: ISelectActivity;
}

const ActivityDetails: React.FC<IProps> = ({
  activity,
  setEditMode,
  selectActivity
}) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => selectActivity('')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = ({
  activity: { selectedActivity }
}: IStore): { activity: IActivity } => {
  return { activity: selectedActivity! };
};

export default connect(mapStateToProps, {
  selectActivity,
  setEditMode
})(ActivityDetails);
