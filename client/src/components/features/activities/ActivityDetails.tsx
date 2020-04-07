import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

import Loading from "../../layout/Loading";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import { IActivity } from "../../../models/activity";
import { loadActivity, ILoadActivity } from "../../../actions";
import { IStore } from "../../../reducers";

interface IProps {
  loadActivity: ILoadActivity;
  activity: IActivity;
  loadingInitial: boolean;
}

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<IProps & RouteComponentProps<DetailParams>> = ({
  loadActivity,
  activity,
  loadingInitial,
  match,
}) => {
  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial) return <Loading content="Loading activity..." />;

  if (!activity) return <h2>Activity not found</h2>;

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
  activity: { activity, loadingInitial },
}: IStore) => ({ activity: activity!, loadingInitial });

export default connect(mapStateToProps, {
  loadActivity,
})(ActivityDetails);
