import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login(props) {
  const history = useHistory();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const rememberRef = React.createRef();

  useEffect(() => {
    if (props.showLogin) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        emailRef.current.value = userInfo.email;
        passwordRef.current.value = userInfo.pwd;
        rememberRef.current.checked = true;
      }
    }
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    let email = emailRef.current.value;
    let pwd = passwordRef.current.value;
    let remember = rememberRef.current.checked;

    if (!remember) {
      localStorage.removeItem("userInfo");
    }

    fetch("http://localhost:3001/login", {
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
        if (json.success) {
          if (remember) {
            let userInfo = {
              email: email,
              pwd: pwd,
            };
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
          }
          let loggedInUser = {
            email: email,
          };
          localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
          history.go(0);
        } else {
          alert("Authentication failed.");
          emailRef.current.value = "";
          passwordRef.current.value = "";
        }
      });
  };

  return (
    <Modal show={props.showLogin} onHide={props.handleLoginClose}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
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
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Remember my password"
              ref={rememberRef}
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
          <Button
            variant="light"
            onClick={() => {
              props.handleSignupShow();
              props.handleLoginClose();
            }}
            className="mb-3"
            style={{ width: "100%", borderColor: "black" }}
          >
            Become New Member
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
