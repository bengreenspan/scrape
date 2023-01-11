import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "./components/LoggedIn/AuthForm";
import { Main } from "./components/Main";
import Who from "./components/Who";
import Home from "./components/LoggedIn/Home";
import Blog from "./components/Blog";
import Assignments from "./components/Assignments";
import Tips from "./components/Tips";
import NotFound from "./components/NotFound";
import Clubs from "./components/Clubs";
import MonthlyCalendar from "./components/MonthlyCalendar";

import { me } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/who" component={Who} />
            <Route path="/Blog" component={MonthlyCalendar} />
            <Route path="/Assignments" component={Assignments} />
            <Route path="/Tips" component={Tips} />
            <Route path="/Clubs" component={Clubs} />
            <Route path="/Calendar" component={MonthlyCalendar} />
            <Route path="/*">
              <NotFound />{" "}
            </Route>
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
