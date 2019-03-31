import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import "./getGithubApi.css";

export default class GetGithubApi extends Component {
  render() {
    return (
      <div className="getGithubInput">
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            View issues from
          </InputGroupAddon>
          <Input
            type="text"
            id="ReactUrl"
            placeholder="owner/repo-name"
            onChange={this.props.onInputChange}
          />

          <InputGroupAddon addonType="append">
            <Button color="secondary" onClick={this.props.onSearchRepo}>
              Submit
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}
