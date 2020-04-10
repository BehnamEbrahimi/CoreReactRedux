import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Tab, Grid, Header, Card, Image, TabProps } from "semantic-ui-react";
import { format } from "date-fns";

import { IProfile, IUserActivity } from "../../../models/profile";
import { loadUserActivities, ILoadUserActivities } from "../../../actions";
import { IStore } from "../../../reducers";

interface IProps {
  loadUserActivities: ILoadUserActivities;
  profile: IProfile;
  loadingActivities: boolean;
  userActivities: IUserActivity[];
}

const panes = [
  { menuItem: "Future Events", pane: { key: "futureEvents" } },
  { menuItem: "Past Events", pane: { key: "pastEvents" } },
  { menuItem: "Hosting", pane: { key: "hosted" } },
];

const ProfileEvents: React.FC<IProps> = ({
  loadUserActivities,
  profile,
  loadingActivities,
  userActivities,
}) => {
  useEffect(() => {
    loadUserActivities(profile!.username);
  }, [loadUserActivities, profile]);

  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
    let filter;
    switch (data.activeIndex) {
      case 1:
        filter = "past";
        break;
      case 2:
        filter = "hosting";
        break;
      default:
        filter = "future";
        break;
    }
    loadUserActivities(profile!.username, filter);
  };

  return (
    <Tab.Pane loading={loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Activities"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userActivities.map((activity: IUserActivity) => (
              <Card
                as={Link}
                to={`/activities/${activity.id}`}
                key={activity.id}
              >
                <Image
                  src={`/assets/categoryImages/${activity.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{activity.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(new Date(activity.date), "do LLL")}</div>
                    <div>{format(new Date(activity.date), "h:mm a")}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

const mapStateToProps = ({
  profile: { profile, loadingActivities, userActivities },
}: IStore) => ({ profile: profile!, loadingActivities, userActivities });

export default connect(mapStateToProps, { loadUserActivities })(ProfileEvents);
