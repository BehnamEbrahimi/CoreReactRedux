import React from "react";
import { connect } from "react-redux";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header, Divider } from "semantic-ui-react";
import { combineValidators, isRequired } from "revalidate";
import { AxiosResponse } from "axios";

import TextInput from "../../common/TextInput";
import ErrorMessage from "../../common/ErrorMessage";
import SocialLogin from "./SocialLogin";
import { IUserFormValues } from "../../../models/user";
import { login, ILogin } from "../../../actions";
import { IStore } from "../../../reducers";

interface IProps {
  login: ILogin;
  submitError: AxiosResponse | null;
}

const validate = combineValidators({
  email: isRequired("Email"),
  password: isRequired("Password"),
});

const LoginForm: React.FC<IProps> = ({ login, submitError }) => {
  return (
    <FinalForm
      onSubmit={(userData: IUserFormValues) => {
        login(userData);
      }}
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Login to CRR"
            color="teal"
            textAlign="center"
          />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
              text="Invalid email or password"
            />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="teal"
            content="Login"
            fluid
          />
          <Divider horizontal>Or</Divider>
          <SocialLogin />
        </Form>
      )}
    />
  );
};

const mapStateToProps = ({ user: { error } }: IStore) => ({
  submitError: error,
});

export default connect(mapStateToProps, {
  login,
})(LoginForm);
