import React, { Component } from "react";
import { Button } from "reactstrap";

export default class labelsView extends Component {
  render() {
    return (
      <div>
        <Button
          style={{ backgroundColor: "#" + this.props.color }}
          className="border-0 my-1"
          size="sm"
          disabled
        >
          {this.props.name}
        </Button>
      </div>
    );
  }
}
