import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class FullIssues extends Component {
  render() {
    return (
      <ul>
        {this.props.issues.map(issue => (
          <Link key={issue.id} to={"/issues/" + issue.number}>
            <p key={issue.id}>{issue.title}</p>
          </Link>
        ))}
      </ul>
    );
  }
}
