import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function FavoriteItem(props) {
  const openTab = () => {
    window.open(props.url);
  };

  const remove = () => {
    let loggedInUserEmail = JSON.parse(
      localStorage.getItem("loggedInUser")
    ).email;

    fetch("http://localhost:3001/remove", {
      method: "DELETE",
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
        if (!json.success) alert("Remove failed!");
        else {
          props.update();
        }
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
          onClick={remove}
        >
          {" "}
          Remove{" "}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default FavoriteItem;
