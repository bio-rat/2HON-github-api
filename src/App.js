import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Test_Data from "./TEST_DATA";
import NewIssueModal from "./NewIssueModal";
import IssueList from "./issueList";
import GetGithubApi from "./getGithubApi";

const clientId = process.env.REACT_APP_CLIENT_ID;

class App extends Component {
  constructor() {
    super();
    const existingToken = sessionStorage.getItem("token");

    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1]
        : null;

    if (!accessToken && !existingToken) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
    }

    if (accessToken) {
      console.log(`New accessToken: ${accessToken}`);

      sessionStorage.setItem("token", accessToken);
      this.state = {
        token: accessToken
      };
    }

    if (existingToken) {
      this.state = {
        token: existingToken
      };
    }

    this.state = {
      issues: [],
      token: this.state.token
    };
  }

  async componentDidMount() {
    const url = "https://api.github.com/repos/facebook/react/issues";
    let resp = await fetch(url);
    let json = await resp.json();
    this.setState({
      issues: json
    });
  }
  handleTextChange = e => {
    //split input value
    const textValue = e.target.value.split("/");
    // join 2 last text in array to form filteredText
    const filteredText = [
      textValue[textValue.length - 2],
      textValue[textValue.length - 1]
    ].join("/");

    this.setState({
      filteredText: filteredText
    });
  };

  async handleGetData() {
    const repoUrl = this.state.filteredText;
    const selectedPage = this.state.selectedPage;
    const url = `https://api.github.com/repos/${repoUrl}/issues?per_page=10&page=${selectedPage}`;
    await fetch(url)
      .then(resp => {
        if (resp.ok) {
          return resp;
        } else {
          let error = new Error("This repo does not exist. Please try again");
          throw error;
        }
      })
      .then(response => response.json())
      .then(json => {
        this.setState({
          issues: json
        });
      })
      .catch(error => {
        alert(`${error.message}`);
      });
  }

  render() {
    return (
      <div className="App">
        <GetGithubApi
          onInputChange={this.handleTextChange}
          onSearchRepo={() => this.handleGetData()}
        />
        <IssueList issueItem={this.state.issues} />
      </div>
    );
  }
}

export default App;
