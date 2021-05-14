import Navigation from "./navbar";
import Login from "./login";
import Signup from "./signup";
import SeachRet from "./result";
import React, { useState } from "react";
import "./page.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchBar from "./searchbar";

function Page() {
  const [showLogin, setShowLogin] = useState(false);
  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const [showSignup, setShowSignup] = useState(false);
  const handleSignupClose = () => setShowSignup(false);
  const handleSignupShow = () => setShowSignup(true);

  return (
    <Router>
      <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Navigation handleLoginShow={handleLoginShow} />
      </Container>
      <Container fluid>
        <Login
          showLogin={showLogin}
          handleLoginClose={handleLoginClose}
          handleSignupShow={handleSignupShow}
        />
        <Signup showSignup={showSignup} handleSignupClose={handleSignupClose} />
        <Switch>
          <Route path="/search/:keywords" exact>
            <SeachRet />
          </Route>
          <Route path="/" exact>
            <SearchBar />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default Page;
