import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import FullIssues from "./FullIssues";
import Issue from "./Issue";

import "./issueList.css";

export default class issueList extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/issues"
          render={props => (
            <FullIssues
              {...props}
              onSelect={this.props.onSelect}
              closeIssue={this.props.closeIssue}
              issueItem={this.props.issueItem}
            />
          )}
        />
        <Route
          path="/issues/:number"
          render={props => (
            <Issue
              {...props}
              issueItem={this.props.issueItem}
              onClose={this.props.onClose}
            />
          )}
        />
      </Switch>
    );
  }
}
