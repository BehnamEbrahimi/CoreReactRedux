import React from "react";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";

import TextInput from "../../common/TextInput";
import TextAreaInput from "../../common/TextAreaInput";
import { IProfile } from "../../../models/profile";
import { editProfile, IEditProfile } from "../../../actions";
import { IStore } from "../../../reducers";

interface IProps {
  editProfile: IEditProfile;
  profile: IProfile;
}

const validate = combineValidators({
  displayName: isRequired("displayName"),
});

const ProfileEditForm: React.FC<IProps> = ({ editProfile, profile }) => {
  return (
    <FinalForm
      onSubmit={editProfile}
      validate={validate}
      initialValues={profile!}
      render={({ handleSubmit, invalid, pristine, submitting }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Display Name"
            value={profile!.displayName}
          />
          <Field
            name="bio"
            component={TextAreaInput}
            rows={3}
            placeholder="Bio"
            value={profile!.bio}
          />
          <Button
            loading={submitting}
            floated="right"
            disabled={invalid || pristine}
            positive
            content="Update profile"
          />
        </Form>
      )}
    />
  );
};

const mapStateToProps = ({ profile: { profile } }: IStore) => ({
  profile: profile!,
});

export default connect(mapStateToProps, { editProfile })(ProfileEditForm);
