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

class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
  }

  getCommentDetails(number, id) {
    const url2 = `https://api.github.com/repos/facebook/react/issues/${number}/comments/${id}`;

    fetch(url2)
      .then(result => result.json())
      .then(result => {
        this.setState(
          {
            selectedIssue: result
          },
          () => console.log("comment", this.state.selectedIssue)
        );
      });
  }

  showComment(number, id) {
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
        <Form>
          <FormGroup>
            <Input type="textarea" name="text" number="exampleText" />
          </FormGroup>
        </Form>
        <Button color="primary" onClick={() => this.addComment}>
          Comment
        </Button>{" "}
        <Button color="secondary" onClick={() => this.addEmo}>
          Emoticon
        </Button>
      </div>
    );
  }
}

export default Comment;
