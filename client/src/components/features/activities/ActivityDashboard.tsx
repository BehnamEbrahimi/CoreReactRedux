import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

import ActivityList from "./ActivityList";
import Loading from "../../layout/Loading";
import { loadActivities, ILoadActivities } from "../../../actions";
import { IStore } from "../../../reducers";

interface IProps {
  loadActivities: ILoadActivities;
  loadingInitial: boolean;
}

const ActivityDashboard: React.FC<IProps> = ({
  loadActivities,
  loadingInitial,
}) => {
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial) return <Loading content="Loading activities" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = ({ activity: { loadingInitial } }: IStore) => ({
  loadingInitial,
});

export default connect(mapStateToProps, { loadActivities })(ActivityDashboard);
