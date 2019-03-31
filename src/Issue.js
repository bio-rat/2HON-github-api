import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Button } from "reactstrap";

export default class Issue extends Component {
  render() {
    const chosenId = this.props.match.params.number;
    const issues = this.props.issueItem;
    // eslint-disable-next-line eqeqeq
    const currentIssue = issues.filter(issue => issue.number == chosenId);
    return (
      <div>
        <h1>This is issue {currentIssue[0].number}</h1>
        <p>Title: {currentIssue[0].title}</p>
        <ReactMarkdown source={currentIssue[0].body} />
        <Button>
          <Link to="/issues">Back</Link>
        </Button>
      </div>
    );
  }
}
