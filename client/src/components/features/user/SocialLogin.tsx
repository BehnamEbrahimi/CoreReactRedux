import React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { fbLogin, IFbLogin } from "../../../actions";
import { IStore } from "../../../reducers";

interface IProps {
  fbLogin: IFbLogin;
  loading: boolean;
}

const SocialLogin: React.FC<IProps> = ({ fbLogin, loading }) => {
  return (
    <div>
      <FacebookLogin
        appId="1401085816740456"
        fields="name, email, picture"
        callback={fbLogin}
        render={(renderProps: any) => (
          <Button
            loading={loading}
            onClick={renderProps.onClick}
            type="button"
            fluid
            color="facebook"
          >
            <Icon name="facebook" />
            Login with Facebook
          </Button>
        )}
      />
    </div>
  );
};

const mapStateToProps = ({ user: { loading } }: IStore) => ({ loading });

export default connect(mapStateToProps, { fbLogin })(SocialLogin);
