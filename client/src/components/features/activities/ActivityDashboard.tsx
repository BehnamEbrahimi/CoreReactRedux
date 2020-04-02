import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import ActivityList from './ActivityList';
import ActivityDetails from './ActivityDetails';
import ActivityForm from './ActivityForm';
import Loading from '../../layout/Loading';
import { IActivity } from '../../../models/activity';
import { loadActivities, ILoadActivities } from '../../../actions';
import { IStore } from '../../../reducers';

interface IProps {
  loadActivities: ILoadActivities;
  selectedActivity: IActivity | undefined;
  editMode: boolean;
  loadingInitial: boolean;
}

const ActivityDashboard: React.FC<IProps> = ({
  loadActivities,
  selectedActivity,
  editMode,
  loadingInitial
}) => {
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInitial ? <Loading /> : <ActivityList />}
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          // by giving the key prop, when the prop is changed, the component will re-render (like state)
          <ActivityForm key={(selectedActivity && selectedActivity.id) || 0} />
        )}
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = ({
  activity: { selectedActivity, editMode, loadingInitial }
}: IStore): {
  selectedActivity: IActivity | undefined;
  editMode: boolean;
  loadingInitial: boolean;
} => {
  return { selectedActivity, editMode, loadingInitial };
};

export default connect(mapStateToProps, { loadActivities })(ActivityDashboard);
