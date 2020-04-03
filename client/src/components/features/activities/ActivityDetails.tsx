import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import Loading from '../../layout/Loading';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';
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
  match
}) => {
  useEffect(() => {
    loadActivity(match.params.id);

    // when this component is unmounted, the activity will be cleared
    return () => clearActivity();
  }, [loadActivity, match.params.id, clearActivity]);

  if (loadingInitial || !activity)
    return <Loading content="Loading activity..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
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
