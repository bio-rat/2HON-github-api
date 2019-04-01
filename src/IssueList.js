import React, { Component } from "react";
import "./index.css";
import ReactMarkdown from "react-markdown";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import Comment from "./Comment";

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      isOpen: false,
      filterIssue: []
    };
    this.showModal = this.showModal.bind(this);
  }

  getIssueDetails(number) {
    const url1 = `https://api.github.com/repos/facebook/react/issues/${number}/comments`;

    fetch(url1)
      .then(result => result.json())
      .then(result => {
        this.setState(
          {
            chosenComment: result
          },
          () => console.log("comment", this.state.chosenComment)
        );
      });
  }

  showModal(number) {
    let filterIssue = this.props.issues.filter(
      comment => comment.number == number
    );
    this.setState({
      isOpen: !this.state.isOpen,
      filterIssue: filterIssue[0]
    });
    this.getIssueDetails(number);
  }

  render() {
    return (
      <div>
        <div>
          {this.props.issues.map(comment => (
            <ul>
              <li
                key={comment.number}
                onClick={() => this.showModal(comment.number)}
              >
                Issue#{comment.number}- {comment.title}
              </li>
            </ul>
          ))}
        </div>

        <Modal isOpen={this.state.isOpen} className="modal">
          <ModalHeader>
            <p>
              Issue #{this.state.filterIssue[0]}: {this.state.filterIssue.title}
              - Comments
            </p>
          </ModalHeader>
          <ModalBody>
            <p>Total comments: {this.state.filterIssue.comments}</p>
            <ReactMarkdown source={this.state.filterIssue.body} />
          </ModalBody>
          <ModalFooter>
            <Comment />
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default IssueList;
