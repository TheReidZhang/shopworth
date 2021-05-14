import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function Item(props) {
  const openTab = () => {
    window.open(props.url);
  };

  const addCart = () => {
    let loggedInUserEmail = JSON.parse(
      localStorage.getItem("loggedInUser")
    ).email;

    fetch("http://localhost:3001/addfavorite", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: loggedInUserEmail,
        img: props.img,
        product: props.product,
        price: props.price,
        url: props.url,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.success) alert("Add to favorite failed!");
      });
  };

  return (
    <Card>
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Text style={{ fontSize: "70%" }}>
          {props.product}
          <br />
          {props.price}
        </Card.Text>
        <Button
          variant="outline-dark"
          style={{ fontSize: "70%" }}
          onClick={openTab}
        >
          {" "}
          Visit Store{" "}
        </Button>
        <Button
          variant="outline-dark"
          style={{ fontSize: "70%" }}
          onClick={addCart}
        >
          {" "}
          Add to cart{" "}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Item;
