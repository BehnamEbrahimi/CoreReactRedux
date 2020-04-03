import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Image, Button } from 'semantic-ui-react';

import Loading from '../../layout/Loading';
import { IActivity } from '../../../models/activity';
import {
  loadActivity,
  ILoadActivity,
  clearActivity,
  IClearActivity
} from '../../../actions';
import { IStore } from '../../../reducers';

interface IProps {
  loadActivity: ILoadActivity;
  clearActivity: IClearActivity;
  activity: IActivity;
  loadingInitial: boolean;
}

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<IProps & RouteComponentProps<DetailParams>> = ({
  loadActivity,
  clearActivity,
  activity,
  loadingInitial,
  match,
  history
}) => {
  useEffect(() => {
    loadActivity(match.params.id);

    // when this component is unmounted, the activity will be cleared
    return () => clearActivity();
  }, [loadActivity, match.params.id, clearActivity]);

  if (loadingInitial || !activity)
    return <Loading content="Loading activity..." />;

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
            as={Link}
            to={`/manage/${activity.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            as={Link}
            to={'/activities'}
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
  activity: { activity, loadingInitial }
}: IStore): { activity: IActivity; loadingInitial: boolean } => {
  return { activity: activity!, loadingInitial };
};

export default connect(mapStateToProps, {
  loadActivity,
  clearActivity
})(ActivityDetails);
