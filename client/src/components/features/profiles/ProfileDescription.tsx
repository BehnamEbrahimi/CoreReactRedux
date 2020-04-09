import React, { useState } from "react";
import { connect } from "react-redux";
import { Tab, Grid, Header, Button } from "semantic-ui-react";

import ProfileEditForm from "./ProfileEditForm";
import { IProfile } from "../../../models/profile";
import { IStore } from "../../../reducers";

interface IProps {
  profile: IProfile;
  isCurrentUser: boolean;
}

const ProfileDescription: React.FC<IProps> = ({ profile, isCurrentUser }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? <ProfileEditForm /> : <span>{profile!.bio}</span>}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

const mapStateToProps = ({ profile: { profile, isCurrentUser } }: IStore) => ({
  profile: profile!,
  isCurrentUser,
});

export default connect(mapStateToProps, {})(ProfileDescription);
