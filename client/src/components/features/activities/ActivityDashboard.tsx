import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Loader } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";

import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";
import { IActivity } from "../../../models/activity";
import {
  loadActivities,
  ILoadActivities,
  setPage,
  ISetPage,
  emptyActivities,
  IEmptyActivities,
  resetFilters,
  IResetFilters,
} from "../../../actions";
import { IStore } from "../../../reducers";

interface IProps {
  emptyActivities: IEmptyActivities;
  resetFilters: IResetFilters;
  loadActivities: ILoadActivities;
  setPage: ISetPage;
  loadingInitial: boolean;
  page: number;
  totalPages: number;
  activities: IActivity[];
}

const ActivityDashboard: React.FC<IProps> = ({
  emptyActivities,
  resetFilters,
  loadActivities,
  setPage,
  loadingInitial,
  page,
  totalPages,
  activities,
}) => {
  const [loadingNext, setLoadingNext] = useState(false);

  useEffect(() => {
    emptyActivities();
    resetFilters();
    loadActivities();
  }, [loadActivities, resetFilters, emptyActivities]);

  useEffect(() => {
    setLoadingNext(false);
  }, [activities]);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadActivities();
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInitial && page === 0 ? (
          <ActivityListItemPlaceholder />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && page + 1 < totalPages}
            initialLoad={false}
          >
            <ActivityList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = ({
  activity: { loadingInitial, page, activities, totalPages },
}: IStore) => ({
  loadingInitial,
  page,
  totalPages,
  activities,
});

export default connect(mapStateToProps, {
  emptyActivities,
  resetFilters,
  loadActivities,
  setPage,
})(ActivityDashboard);
