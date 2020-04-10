import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Menu, Header } from "semantic-ui-react";
import { Calendar } from "react-widgets";

import { IActivityFilter } from "../../../models/activity";
import {
  setFilter,
  ISetFilter,
  loadActivities,
  ILoadActivities,
} from "../../../actions";
import { IStore } from "../../../reducers";

interface IProps {
  setFilter: ISetFilter;
  loadActivities: ILoadActivities;
  filter: IActivityFilter;
}

const ActivityFilters: React.FC<IProps> = ({
  setFilter,
  loadActivities,
  filter,
}) => {
  return (
    <Fragment>
      <Menu vertical size={"large"} style={{ width: "100%", marginTop: 50 }}>
        <Header icon={"filter"} attached color={"teal"} content={"Filters"} />
        <Menu.Item
          active={filter.all}
          onClick={() => {
            setFilter("all", "true");
            loadActivities();
          }}
          color={"blue"}
          name={"all"}
          content={"All Activities"}
        />
        <Menu.Item
          active={filter.isGoing}
          onClick={() => {
            setFilter("isGoing", "true");
            loadActivities();
          }}
          color={"blue"}
          name={"username"}
          content={"I'm Going"}
        />
        <Menu.Item
          active={filter.isHost}
          onClick={() => {
            setFilter("isHost", "true");
            loadActivities();
          }}
          color={"blue"}
          name={"host"}
          content={"I'm hosting"}
        />
      </Menu>
      <Header
        icon={"calendar"}
        attached
        color={"teal"}
        content={"Select Date"}
      />
      <Calendar
        onChange={(date) => {
          setFilter("startDate", date!);
          loadActivities();
        }}
        value={filter.startDate || new Date()}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ activity: { filter } }: IStore) => ({ filter });

export default connect(mapStateToProps, { setFilter, loadActivities })(
  ActivityFilters
);
