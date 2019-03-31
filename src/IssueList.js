import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import FullIssues from "./FullIssues";
import Issue from "./Issue";

export default class IssueList extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/issues"
          render={props => <FullIssues {...props} issues={this.props.issues} />}
        />
        <Route
          path="/issues/:number"
          render={props => (
            <Issue
              {...props}
              issues={this.props.issues}
              onClose={this.props.onClose}
            />
          )}
        />
      </Switch>
    );
  }
}
