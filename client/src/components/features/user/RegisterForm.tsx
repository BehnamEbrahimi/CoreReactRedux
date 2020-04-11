import React from "react";
import { connect } from "react-redux";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import { combineValidators, isRequired } from "revalidate";
import { AxiosResponse } from "axios";
import TextInput from "../../common/TextInput";
import ErrorMessage from "../../common/ErrorMessage";
import { IUserFormValues } from "../../../models/user";
import { register, IRegister } from "../../../actions";
import { IStore } from "../../../reducers";

interface IProps {
  register: IRegister;
  submitError: AxiosResponse | null;
}

const validate = combineValidators({
  username: isRequired("Username"),
  displayName: isRequired("DisplayName"),
  email: isRequired("Email"),
  password: isRequired("Password"),
});

const RegisterForm: React.FC<IProps> = ({ register, submitError }) => {
  return (
    <FinalForm
      onSubmit={(userData: IUserFormValues) => {
        register(userData);
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
            content="Sign up to CRR"
            color="teal"
            textAlign="center"
          />
          <Field name="username" component={TextInput} placeholder="Username" />
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Display Name"
          />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="teal"
            content="Register"
            fluid
          />
        </Form>
      )}
    />
  );
};

const mapStateToProps = ({ user: { error } }: IStore) => ({
  submitError: error,
});

export default connect(mapStateToProps, {
  register,
})(RegisterForm);
