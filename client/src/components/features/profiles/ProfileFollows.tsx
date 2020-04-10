import React from "react";
import { connect } from "react-redux";
import { Tab, Grid, Header, Card } from "semantic-ui-react";

import ProfileCard from "./ProfileCard";
import { IStore } from "../../../reducers";
import { IProfile } from "../../../models/profile";

interface IProps {
  profile: IProfile;
  follows: IProfile[];
  loading: boolean;
  activeTab: string;
}

const ProfileFollows: React.FC<IProps> = ({
  profile,
  follows,
  loading,
  activeTab,
}) => {
  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={
              activeTab === "followers"
                ? `People following ${profile!.displayName}`
                : `People ${profile!.displayName} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {follows.map((profile) => (
              <ProfileCard key={profile.username} profile={profile} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

const mapStateToProps = ({
  profile: { profile, follows, loading, activeTab },
}: IStore) => ({ profile: profile!, follows, loading, activeTab });

export default connect(mapStateToProps, {})(ProfileFollows);
