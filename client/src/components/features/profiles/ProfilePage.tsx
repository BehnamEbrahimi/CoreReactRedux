import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Grid } from "semantic-ui-react";

import ProfileHeader from "./ProfileHeader";
import Loading from "../../layout/Loading";
import ProfileContent from "./ProfileContent";
import { loadProfile, ILoadProfile } from "../../../actions";
import { IStore } from "../../../reducers";

interface RouteParams {
  username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  loadProfile: ILoadProfile;
  loadingProfile: boolean;
}

const ProfilePage: React.FC<IProps> = ({
  loadProfile,
  loadingProfile,
  match,
}) => {
  useEffect(() => {
    loadProfile(match.params.username);
  }, [loadProfile, match]);

  if (loadingProfile) return <Loading content="Loading profile..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader />
        <ProfileContent />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = ({ profile: { loadingProfile } }: IStore) => ({
  loadingProfile,
});

export default connect(mapStateToProps, { loadProfile })(ProfilePage);
