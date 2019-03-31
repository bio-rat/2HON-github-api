import React, { Component } from "react";
import { Form, Label, Input, Button } from "reactstrap";

export default class GetGithubApi extends Component {
  render() {
    return (
      <Form className="form-inline">
        <Label for="ReactUrl">View issues from </Label>
        <Input
          type="text"
          id="ReactUrl"
          placeholder="owner/repo-name"
          onChange={this.props.onInputChange}
        />
        <Button onClick={this.props.onSearchRepo}>Submit</Button>
      </Form>
    );
  }
}
