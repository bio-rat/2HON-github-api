import React, { Component } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import "./issueView.css";
import ReactMarkdown from "react-markdown";
import LabelsView from "./labelsView";
import Moment from "react-moment";

export default class issueView extends Component {
  render() {
    return (
      <Container>
        <Row className="issueBox">
          <Col xs="9" className="issueContent text-left py-4 pl-4 pr-0">
            <div>
              <h3>
                {/* Title */}#{this.props.number} {this.props.title}{" "}
                {this.props.state === "open" ? (
                  <Button size="sm" outline disabled color="primary">
                    OPEN ISSUE
                  </Button>
                ) : (
                  <Button size="sm" outline disabled color="secondary">
                    CLOSE ISSUE
                  </Button>
                )}
              </h3>
            </div>
            {/* Body */}
            <div>
              <ReactMarkdown source={this.props.body} />
            </div>
          </Col>
          {/* User */}
          <Col
            xs="3"
            className="issueUser text-right py-4 pr-4 pl-0 d-flex flex-column align-items-end"
          >
            <img
              src={this.props.user.avatar_url}
              className=" border rounded my-1"
            />
            <h6 className="my-1">@{this.props.user.login}</h6>
            {this.props.labels.map(label => (
              <LabelsView {...label} />
            ))}
            {this.props.created_at === this.props.update_at ? (
              <span className="my-1">
                Created{" "}
                <Moment fromNow ago>
                  {this.props.updated_at}
                </Moment>{" "}
                ago.
              </span>
            ) : (
              <span className="my-1">
                final editing{" "}
                <Moment fromNow ago>
                  {this.props.updated_at}
                </Moment>{" "}
                ago.
              </span>
            )}
            <Button size="sm" color="danger" className="mt-auto">
              Close Issue
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
