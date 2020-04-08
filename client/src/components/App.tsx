import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";

import ModalContainer from "./common/ModalContainer";
import NotFound from "./layout/NotFound";
import Loading from "./layout/Loading";
import HomePage from "./features/home/HomePage";
import Navbar from "./features/nav/Navbar";
import ActivityDashboard from "./features/activities/ActivityDashboard";
import ActivityDetails from "./features/activities/ActivityDetails";
import ActivityForm from "./features/activities/ActivityForm";
import ProfilePage from "./features/profiles/ProfilePage";
import { getUser, IGetUser, setAppLoaded, ISetAppLoaded } from "../actions";
import { IStore } from "../reducers";

interface IProps {
  getUser: IGetUser;
  setAppLoaded: ISetAppLoaded;
  token: string | null;
  appLoaded: boolean;
}

const App: React.FC<IProps & RouteComponentProps> = ({
  getUser,
  setAppLoaded,
  token,
  appLoaded,
  location,
}) => {
  useEffect(() => {
    token ? getUser() : setAppLoaded();
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <Loading content="Loading app..." />;

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"} // match for anything
        render={() => (
          <Fragment>
            <Navbar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route
                  exact
                  path="/activities/:id"
                  component={ActivityDetails}
                />
                <Route
                  key={location.key} // by this, when the location (which is a prop) changes, the component will be re-rendered
                  exact
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <Route path="/profile/:username" component={ProfilePage} />
                <Route
                  component={NotFound} // Obviously, there is path for this component! And because there is no path, we cannot use exact and we must use Switch.
                />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ app: { token, appLoaded } }: IStore) => ({
  token,
  appLoaded,
});

export default connect(mapStateToProps, { getUser, setAppLoaded })(
  withRouter(App)
); //withRouter is solely because we want to access location here.
// Normally, we have access to location, history and match objects inside components rendered by Route.
