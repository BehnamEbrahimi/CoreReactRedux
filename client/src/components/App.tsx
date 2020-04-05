import React, { Fragment } from "react";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";

import HomePage from "./features/home/HomePage";
import Navbar from "./features/nav/Navbar";
import NotFound from "./layout/NotFound";
import ActivityDashboard from "./features/activities/ActivityDashboard";
import ActivityDetails from "./features/activities/ActivityDetails";
import ActivityForm from "./features/activities/ActivityForm";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
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

export default withRouter(App); //withRouter is solely because we want to access location here.
// Normally, we have access to location, history and match objects inside components rendered by Route.
