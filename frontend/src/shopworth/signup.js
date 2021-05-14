import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup(props) {
  const history = useHistory();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const onFormSubmit = (e) => {
    e.preventDefault();
    let email = emailRef.current.value;
    let pwd = passwordRef.current.value;
    fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: email, password: pwd }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.success) history.go(0);
        else alert("Fail to create a new user!");
      });
  };

  return (
    <Modal show={props.showSignup} onHide={props.handleSignupClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onFormSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mb-3"
            style={{ width: "100%", backgroundColor: "black" }}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Signup;
