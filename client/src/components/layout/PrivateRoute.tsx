import React from "react";
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { connect } from "react-redux";
import { IStore } from "../../reducers";

interface IProps extends RouteProps {
  isLoggedIn: boolean;
  component?: React.ComponentType<RouteComponentProps<any>>;
  render?: (props: any) => JSX.Element;
}

const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  render,
  isLoggedIn,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn)
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        return Component ? <Component {...props} /> : render!(props);
      }}
    />
  );
};

const mapStateToProps = ({ user: { isLoggedIn } }: IStore) => ({ isLoggedIn });

export default connect(mapStateToProps, {})(PrivateRoute);
