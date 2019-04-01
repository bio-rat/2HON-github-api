
import React, { Component, } from "react";
import {Form, Alert, Button} from 'react-bootstrap'


export default class ErrorAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: this.props.isOn};
  }

  render() {
    const handleHide = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });
     if (this.props.isError)
     {
    return ( 
      <> 
     
        <Alert show={this.state.show} variant="danger">
          <Alert.Heading> Errors  </Alert.Heading>
          <p>
           There's something wrong!
        </p>
        
          <hr />
          <div className="d-flex justify-content-start">
          Errors are bugs to apps, but lessons to programmers!
          </div> 
          <div className="d-flex justify-content-end">
            <Button onClick={handleHide} variant="outline-danger">
              Close me!
            </Button>
          </div>
        </Alert>
         {!this.state.show && <Button variant="warning" onClick={handleShow}>Show Alert</Button>} </> );
         
       } 
    
    return (
        <>
        <Alert show={this.state.show} variant="succes">
          <Alert.Heading> Success! </Alert.Heading>
          <p>
           1 new issue added to the Github!
        </p>
        
          <hr />
          <div className="d-flex justify-content-start">
          Congratulations! 
          </div> 
          <div className="d-flex justify-content-end">
            <Button onClick={handleHide} variant="outline-success">
              Close me!
            </Button>
          </div>
        </Alert>
         {!this.state.show && <Button variant="warning" onClick={handleShow}>Show Alert</Button>} </>
        );
}
   }


// render(<AlertDismissible />);