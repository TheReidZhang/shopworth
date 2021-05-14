import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function SearchBar() {
  const searchRef = React.createRef();
  const history = useHistory();

  const searchItem = (e) => {
    e.preventDefault();
    let url = "/search/" + searchRef.current.value;
    history.push(url);
  };

  return (
    <div className="center-container">
      <div style={{ display: "table-cell", verticalAlign: "middle" }}>
        <Form onSubmit={searchItem}>
          <Form.Row>
            <Col md={10} xs={10} lg={10}>
              <Form.Control
                ref={searchRef}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Col>
            <Col md={2} xs={2} lg={2}>
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
    </div>
  );
}

export default SearchBar;
