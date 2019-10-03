import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, Redirect } from "react-router-dom";
import SignIn from "./components/SignIn";
import Root from "./components/Root";
import Slot from "./components/Slot";
import Edit from "./components/Edit";
import Create from "./components/Create";
import Settings from "./components/Settings";
import configureStore from "./redux/configureStore";
import errorHandler from "./tools/errorHandler";
import history from "./tools/history";

errorHandler();

const store = configureStore();
store.runSaga();

const checkAuth = (Component: React.FC<any>) => (props: any) => (store.getState().app.auth
  // eslint-disable-next-line react/jsx-props-no-spreading
  ? <Component {...props} />
  : <Redirect to="/sign-in" />);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/" render={checkAuth(Root)} />
        <Route exact path="/new" render={checkAuth(Create)} />
        <Route path="/new/:id" render={checkAuth(Create)} />
        <Route path="/slot/:id" render={checkAuth(Slot)} />
        <Route path="/edit/:id" render={checkAuth(Edit)} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/settings" render={checkAuth(Settings)} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root"),
);
