import React, { Component } from "react";
import IssueView from "./issueView";
import IssuePagination from "./issuePagination";
import "./issueList.css";

export default class issueList extends Component {
  render() {
    return (
      <div>
        <IssuePagination />
        <div className="issueBody border">
          {this.props.issueItem.map(issue => (
            <IssueView {...issue} />
          ))}
        </div>
      </div>
    );
  }
}
