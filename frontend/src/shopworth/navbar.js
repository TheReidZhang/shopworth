import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import FavoriteItem from "./favorite";

function Navigation(props) {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [showFavorite, setShowFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const searchRef = React.createRef();

  useEffect(() => {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUserEmail(loggedInUser.email);
    }
  });

  const logOut = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
  };

  const changePwd = () => {
    let pwd = prompt("Please enter your new password:");
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")).email;

    fetch("http://localhost:3001/changepwd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: loggedInUser, password: pwd }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) alert("Success!");
        else alert("Failed!");
      });
  };

  const renderButton = () => {
    if (isLoggedIn) {
      return (
        <NavDropdown title={userEmail} id="basic-nav-dropdown">
          <NavDropdown.Item onClick={changePwd}>
            Change Password
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
        </NavDropdown>
      );
    } else {
      return <Nav.Link onClick={props.handleLoginShow}>Sign in</Nav.Link>;
    }
  };

  const searchItem = (e) => {
    e.preventDefault();
    let url = "/search/" + searchRef.current.value;
    history.push(url);
    history.go(url);
  };

  const getFavorites = () => {
    const items = [];

    fetch("http://localhost:3001/favorites/" + userEmail, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          json = json.favorite;
          console.log(json);
          if (json.length === 0) {
            setFavorites(<h1> No item found!</h1>);
            return;
          }

          for (var i = 0; i < json.length; i++) {
            let ele = json[i];
            items.push(
              <Col className="mb-3">
                <FavoriteItem
                  key={i}
                  img={ele["img"]}
                  product={ele["product"]}
                  price={ele["price"]}
                  url={ele["url"]}
                  update={getFavorites}
                />
              </Col>
            );
          }
          setFavorites(items);
        } else alert("Fail!");
      });
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="/" onClick={() => history.go("/")}>
        SHOPWORTH
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            onClick={() => {
              getFavorites();
              setShowFavorite(true);
            }}
          >
            Favorites
          </Nav.Link>

          <Modal show={showFavorite} onHide={() => setShowFavorite(false)}>
            <Modal.Header closeButton>
              <Modal.Title>My Favorites</Modal.Title>
            </Modal.Header>
            <Modal.Body>{favorites}</Modal.Body>
          </Modal>

          {renderButton()}
        </Nav>

        <Form inline onSubmit={searchItem}>
          <Form.Control
            ref={searchRef}
            type="text"
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
