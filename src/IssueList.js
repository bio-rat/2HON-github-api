import React, { Component } from "react";
import IssueView from "./issueView";
import IssuePagination from "./issuePagination";
import "./issueList.css";

export default class issueList extends Component {
  render() {
    return (
      <div>
        <IssuePagination onSelect={this.props.onSelect} />
        <div className="issueBody border">
          {this.props.issueItem.map(issue => (
            <IssueView {...issue} closeIssue={this.props.closeIssue} />
          ))}
        </div>
      </div>
    );
  }
}
