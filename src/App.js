import React, { Component } from "react";
import "./App.css";

import GetGithubApi from "./GetGithubApi";
import IssueList from "./IssueList";
import { Link, Route, BrowserRouter } from "react-router-dom";
import { Input } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const clientId = process.env.REACT_APP_CLIENT_ID;

class App extends Component {
  constructor() {
    super();
    const existingToken = sessionStorage.getItem("token");

    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1].split("&")[0]
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
      console.log(this.state.token);
    }

    this.state = {
      issues: [],
      token: this.state.token,
      filteredText: "",
      selectedPage: 1
    };
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

  // async handleCloseIssue(number) {
  //   let data = {
  //     state: "closed"
  //   };
  //   const url = `https://api.github.com/repos/etudeofmemories8698/2HON-github-api/issues/${number}`;
  //   const response = await fetch(url, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `token 01b32c88fb962efe3429ae48d86923e520699ca6`
  //     },
  //     body: JSON.stringify(data),
  //     json: true
  //   });
  //   console.log("results: ", response);
  // }

  async handleSearchRepo(e) {
    const searchText = e.target.value.split(" ").join("+");
    const url = `https://api.github.com/search/repositories?q=${searchText}`;
    const response = await fetch(url);
    const json = await response.json();
    this.setState(
      {
        searchResults: json.items
      },
      () => console.log(this.state.searchResults)
    );
  }

  render() {
    return (
      <BrowserRouter>
        <GetGithubApi
          onInputChange={this.handleTextChange}
          onSearchRepo={() => this.handleGetData()}
        />
        <Input placeholder="nothing" onChange={e => this.handleSearchRepo(e)} />
        <div className="autoComplete">{this.state.searchResults}</div>
        <Link to="/issues">Click to open issues</Link>
        <Route
          path="/issues"
          render={props => (
            <IssueList
              {...props}
              issues={this.state.issues}
              onClose={this.handleCloseIssue}
            />
          )}
        />
      </BrowserRouter>
    );
  }
}

export default App;
