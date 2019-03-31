import React from "react";
import "./issuePagination.css";
import ReactDOM from "react-dom";
import PaginationComponent from "react-reactstrap-pagination";

export default class Example extends React.Component {
  render() {
    return (
      <div className="pagination-wrapper">
        <PaginationComponent
          totalItems={10}
          pageSize={1}
          onSelect={selectedPage => this.props.onSelect(selectedPage)}
        />
      </div>
    );
  }
}
