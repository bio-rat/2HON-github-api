import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Test_Data from "./TEST_DATA";
import NewIssueModal from "./NewIssueModal";
import IssueList from "./IssueList";
import GetGithubApi from "./GetGithubApi";
import { Link, Route, BrowserRouter } from "react-router-dom";
import { Button } from "reactstrap";
import netlify from "netlify-auth-providers";

const clientId = process.env.REACT_APP_CLIENT_ID;

class App extends Component {
  constructor() {
    super();

    // const accessToken =
    //   window.location.search.split("=")[0] === "?access_token"
    //     ? window.location.search.split("=")[1].split("&")[0]
    //     : null;

    // if (!accessToken && !existingToken) {
    //   window.location.replace(
    //     `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
    //   );
    // }

    // if (accessToken) {
    //   console.log(`New accessToken: ${accessToken}`);

    //   sessionStorage.setItem("token", accessToken);
    //   this.state = {
    //     token: accessToken
    //   };
    // }

    // if (existingToken) {
    //   this.state = {
    //     token: existingToken
    //   };
    // }

    this.state = {
      issues: [],
      // token: this.state.token,
      selectedPage: 1
    };
    this.handleCloseIssue = this.handleCloseIssue.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
  }

  componentDidMount() {
    var authenticator = new netlify({
      site_id: "57bf9bb8-c571-4f19-a5c9-49687ae9c8b6"
    });
    let fetchedToken;
    console.log("authen: ", authenticator);
    authenticator.authenticate(
      { provider: "github", scope: "public_repo,read:org,read:user" },
      function(err, data) {
        fetchedToken = data.token;
      }
    );
    this.setState(
      {
        token: fetchedToken
      },
      () => console.log("token: ", this.state.token)
    );
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
    const url = `https://api.github.com/repos/${repoUrl}/issues?state=all&per_page=10&page=${selectedPage}`;
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
        this.setState(
          {
            issues: json
          },
          () => console.log(this.state.issues)
        );
      })
      .catch(error => {
        alert(`${error.message}`);
      });
  }
  async handleCloseIssue(number) {
    let data = {
      state: "closed"
    };
    const url = `https://api.github.com/repos/etudeofmemories8698/2HON-github-api/issues/${number}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${this.state.token}`
      },
      body: JSON.stringify(data),
      json: true
    });
    if (response) {
      this.handleGetData();
    }
    console.log("response", response);
  }

  handleSelected(selectedPage) {
    this.setState(
      {
        selectedPage: selectedPage
      },
      () => this.handleGetData()
    );
  }

  render() {
    return (
      <div className="App">
        <GetGithubApi
          onInputChange={this.handleTextChange}
          onSearchRepo={() => this.handleGetData()}
        />
        <NewIssueModal token={this.state.token} />
        <BrowserRouter>
          <div className="d-flex justify-content-end buttonLink">
            <Button outline color="secondary">
              <Link to="/issues">Click to open issues</Link>
            </Button>
          </div>
          <Route
            path="/issues"
            render={props => (
              <IssueList
                {...props}
                issueItem={this.state.issues}
                closeIssue={this.handleCloseIssue}
                onSelect={this.handleSelected}
              />
            )}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
