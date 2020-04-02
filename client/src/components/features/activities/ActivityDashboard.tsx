import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import ActivityList from './ActivityList';
import ActivityDetails from './ActivityDetails';
import ActivityForm from './ActivityForm';
import Loading from '../../layout/Loading';
import { IActivity } from '../../../models/activity';
import { fetchActivities, IFetchActivities } from '../../../actions';
import { IStore } from '../../../reducers';

interface IProps {
  fetchActivities: IFetchActivities;
  selectedActivity: IActivity | undefined;
  editMode: boolean;
  loading: boolean;
}

const ActivityDashboard: React.FC<IProps> = ({
  fetchActivities,
  selectedActivity,
  editMode,
  loading
}) => {
  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading ? <Loading /> : <ActivityList />}
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
  loading: boolean;
} => {
  return { selectedActivity, editMode, loading: loadingInitial };
};

export default connect(mapStateToProps, { fetchActivities })(ActivityDashboard);
