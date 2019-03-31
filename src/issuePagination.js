import React from "react";
import "./issuePagination.css";
import ReactDOM from "react-dom";
import PaginationComponent from "react-reactstrap-pagination";

export default class Example extends React.Component {
  handleSelected(selectedPage) {
    console.log("selected", selectedPage);
    this.setState({ selectedPage: selectedPage });
  }
  render() {
    return (
      <div className="pagination-wrapper">
        <PaginationComponent
          totalItems={30}
          pageSize={3}
          onSelect={this.handleSelected}
        />
      </div>
    );
  }
}
