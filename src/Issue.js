import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Button, Container, Row, Col } from "reactstrap";
import LabelsView from "./labelsView";
import Moment from "react-moment";
import "./issue.css";

export default class Issue extends Component {
  render() {
    const chosenId = this.props.match.params.number;
    const issues = this.props.issueItem;
    // eslint-disable-next-line eqeqeq
    const currentIssue = issues.filter(issue => issue.number == chosenId);
    return (
      <div className="issueBodyChil">
        <Container className=" border rounded mb-2">
          <Row className="d-flex align-items-center my-2">
            <Col xs="1">
              <Button>
                <Link to="/issues">Back</Link>
              </Button>
            </Col>
            <Col xs="10">
              <h2>
                #{currentIssue[0].number} {currentIssue[0].title}
              </h2>
            </Col>
            <Col xs="1">
              {currentIssue[0].state === "open" ? (
                <Button size="sm" outline disabled color="primary">
                  OPEN ISSUE
                </Button>
              ) : (
                <Button size="sm" outline disabled color="secondary">
                  CLOSE ISSUE
                </Button>
              )}
            </Col>
          </Row>
          <Row className="d-flex align-items-center my-2">
            <Col xs="6" className="d-flex align-items-center">
              <div className="talk">
                <img
                  src={currentIssue[0].user.avatar_url}
                  className=" border rounded my-1 issueImg"
                />
              </div>{" "}
              <h6 className="my-1 ml-3">@{currentIssue[0].user.login}</h6>{" "}
              {currentIssue[0].created_at === currentIssue[0].update_at ? (
                <span className="my-1 ml-1">
                  Created{" "}
                  <Moment fromNow ago>
                    {currentIssue[0].updated_at}
                  </Moment>{" "}
                  ago.
                </span>
              ) : (
                <span className="my-1 ml-1">
                  final editing{" "}
                  <Moment fromNow ago>
                    {currentIssue[0].updated_at}
                  </Moment>{" "}
                  ago.
                </span>
              )}
            </Col>
            <Col xs="6" className="text-right">
              <div>
                {currentIssue[0].labels.map(label => (
                  <LabelsView {...label} />
                ))}
              </div>
            </Col>
          </Row>
          <Row className="p-3 mb-2 bg-dark text-white">
            <ReactMarkdown source={currentIssue[0].body} />
          </Row>
        </Container>
      </div>
    );
  }
}
