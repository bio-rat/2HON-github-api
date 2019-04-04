import React, { Component } from "react";

import { Row, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactModal from "react-modal";
import Button from "react-bootstrap/Button";
import { Form, Alert } from "react-bootstrap";

// import ErrorAlert from "./ErrorAlert";

export default class NewIssueModal extends Component {
  constructor() {
    super();
    this.state = {
      apiItems: [],
      isModalopen: false,
      newInput1: "",
      newInput2: "",
      hasError: false,
      allerton: false
    };

    this.updateInput1 = this.updateInput1.bind(this);
    this.updateInput2 = this.updateInput2.bind(this);
    this.creatNewIssue = this.creatNewIssue.bind(this);
  }
  // async fetchIssues() {
  //   const url =
  //     "https://api.github.com/repos/etudeofmemories8698/2HON-github-api/issues";
  //   let response;
  //   console.log("url", url);
  //   try {
  //     response = await fetch(url, {
  //       method: "GET"
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   let json = await response.json();
  //   this.setState({ apiItems: json });
  //   console.log(this.state.apiItems);
  // }

  showModal = () => {
    this.setState({ isModalopen: true });
  };

  updateInput1(event) {
    this.setState({ newInput1: event.target.value });
  }

  updateInput2(event) {
    this.setState({ newInput2: event.target.value });
  }

  async creatNewIssue() {
    // console.log("hi" + this.state.newInput1 + this.state.newInput2);
    this.setState({ allerton: true });
    const data = { title: this.state.newInput1, body: this.state.newInput2 };
    const url =
      "https://api.github.com/repos/etudeofmemories8698/2HON-github-api/issues";
    let response;

    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${this.props.token}`
      },
      body: JSON.stringify(data),
      json: true
    });
    let json = await response.json();
    console.log(response);
    this.setState({
      isModalopen: false
    });
    // this.fetchIssues();
  }

  // componentDidMount() {
  //   // this.fetchIssues();
  // }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }
  // ShowAlert() {
  //   if (this.state.hasError) {
  //     // You can render any custom fallback UI
  //     return <ErrorAlert isOn={this.state.allerton} isError="true" />;
  //   } else {
  //     return <ErrorAlert isOn={this.state.allerton} isError="false" />;
  //   }
  // }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.state.isModalopen}
          onRequestClose={this.handleCloseModal}
          // onAfterOpen={this.showModal}
        >
          <Form>
            <ModalHeader>
              {" "}
              <Row className="justify-content-md-center "> New Issue </Row>{" "}
            </ModalHeader>

            <ModalBody>
              <Form.Group controlId="">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  onChange={e => this.updateInput1(e)}
                />
                <Form.Text className="text-muted">
                  The title of the new issue
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="Enter your comment"
                  onChange={e => this.updateInput2(e)}
                />
              </Form.Group>
            </ModalBody>

            <ModalFooter>
              <Button variant="danger" onClick={() => this.creatNewIssue()}>
                {" "}
                Summit new issue{" "}
              </Button>
            </ModalFooter>
          </Form>
        </ReactModal>

        <div>
          <Button
            style={{
              marginLeft: "79%",
              marginTop: "10px"
            }}
            variant="danger"
            onClick={this.showModal}
          >
            {" "}
            Create new issue{" "}
          </Button>
          {/* {
            this.state.apiItems &&
            this.state.apiItems.map(item => (
              <li>
                {" "}
                {item.title}: {item.body}
              </li>
            ))
          } */}
        </div>
      </div>
    );
  }
}
