import React, { Component } from "react";
import IssueView from "./issueView";
import IssuePagination from "./issuePagination";

export default class FullIssues extends Component {
  render() {
    return (
      <div className="issueBody border">
        <IssuePagination onSelect={this.props.onSelect} />

        {this.props.issueItem.map(issue => (
          <IssueView {...issue} closeIssue={this.props.closeIssue} />
        ))}
      </div>
    );
  }
}
