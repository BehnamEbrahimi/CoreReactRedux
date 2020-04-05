import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import dateFnsLocalizer from "react-widgets-date-fns";
import "react-widgets/dist/css/react-widgets.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles.css";
import App from "./components/App";
import ScrollToTop from "./components/layout/ScrollToTop";
import reducers from "./reducers";

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export const history = createBrowserHistory();

dateFnsLocalizer();

ReactDOM.render(
  <Provider store={store}>
    <Router // We didn't use BrowserRouter
      history={history} // because we want to have access to history object in the api agent and action creators
    >
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById("root")
);
