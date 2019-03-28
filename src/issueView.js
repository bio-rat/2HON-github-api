import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./issueView.css";

export default class issueView extends Component {
  render() {
    return (
      <Container>
        <Row className="issueBox">
          <Col xs="10" className="issueContent text-left py-4">
            <div>
              <h3>
                #{this.props.number} {this.props.title}
              </h3>
            </div>
            <div>`{this.props.body}`</div>
          </Col>
          <Col xs="2" className="issueUser text-right py-4">
            <img src={this.props.user.avatar_url} className=" border rounded" />
            <h6>@{this.props.user.login}</h6>
          </Col>
        </Row>
      </Container>
    );
  }
}
