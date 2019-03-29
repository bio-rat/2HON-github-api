import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import GetGithubApi from "./GetGithubApi";
import NewIssueModal from "./NewIssueModal";
import IssueList from "./IssueList";

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

  render() {
    return (
      <div className="App">
        <GetGithubApi />
        <IssueList />
        <NewIssueModal />
      </div>
    );
  }
}

export default App;
