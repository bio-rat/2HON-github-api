import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./issueView.css";
import ReactMarkdown from "react-markdown";

export default class issueView extends Component {
  render() {
    return (
      <Container>
        <Row className="issueBox">
          <Col xs="10" className="issueContent text-left py-4 pl-4 pr-0">
            <div>
              <h3>
                #{this.props.number} {this.props.title}
              </h3>
            </div>
            <div>
              <ReactMarkdown source={this.props.body} />
            </div>
          </Col>
          <Col xs="2" className="issueUser text-right py-4 pr-4 pl-0">
            <img src={this.props.user.avatar_url} className=" border rounded" />
            <h6>@{this.props.user.login}</h6>
          </Col>
        </Row>
      </Container>
    );
  }
}
