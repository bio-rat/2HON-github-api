import React, { Component, } from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactModal from "react-modal";
//import { } from "Bootstrap";



export default class NewIssueModal extends Component {
  constructor() {
    super();
    this.state = { apiItems: [], isModalopen: false, newInput1: "", newInput2: "" };

    this.updateInput1 = this.updateInput1.bind(this);
    this.updateInput2 = this.updateInput2.bind(this);
    this.creatNewIssue = this.creatNewIssue.bind(this);
  }
  async fetchIssues() {
    const url =
      "https://api.github.com/repos/etudeofmemories8698/2HON-github-api/issues";
    let response;
    console.log("url", url);
    try {
      response = await fetch(url, {
        method: "GET"
      });
    } catch (error) {
      console.log(error);
    }
    let json = await response.json();
    this.setState({ apiItems: json });
    console.log(this.state.apiItems);
  }

  showModal = () => {
    this.setState({ isModalopen: true });

  }


  updateInput1(event) {
    this.setState({ newInput1: event.target.value });
  }

  updateInput2(event) {
    this.setState({ newInput2: event.target.value });
  }

  async creatNewIssue() {
    console.log("hi" + this.state.newInput1);
    const data = { title: this.state.newInput1, body: this.state.newInput2 };
    const url = "https://api.github.com/repos/etudeofmemories8698/2HON-github-api/issues";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "token 848817fbb5ec0c374a50b4cb99704785e9ebd534"
      },
      body: JSON.stringify(data),
      json: true

    });
    let json = await response.json();
    this.fetchIssues();
    console.log(json);
  }
  componentDidMount() {
    this.fetchIssues();
  }



  render() {
    return (
      // <div>
      //   
      // </div>
      <div>
        <ReactModal
          isOpen={this.state.isModalopen}
        // onAfterOpen={this.showModal}
        >
          <div> <h1>New Issue Form </h1> </div>
          <input id="title" type="text" placeholder="Title" onChange={() => this.updateInput1} />
          <div>
            <textarea id="comment" class="" placeholder="Leave a comment" onChange={() => this.updateInput2}> </textarea>
          </div>

          <div>
            <Button class="btn btn-primary mr-3" onClick={() => this.creatNewIssue()}> Summit new issue </Button>
          </div>

        </ReactModal>

        <div>
          <Button onClick={this.showModal}>
            {" "}New Issue{" "}  </Button>
          {
            this.state.apiItems &&
            this.state.apiItems.map(item => (
              <li>
                {" "}
                {item.title}: {item.body}
              </li>
            ))
          }
        </div >
      </div >

    );
  }
}
