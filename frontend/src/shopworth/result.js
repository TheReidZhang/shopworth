import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Item from "./item";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

function SeachRet(props) {
  const { keywords } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/search/" + keywords, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setSearchResults(json);
        setIsLoading(false);
      });
  }, [keywords]);

  const renderItems = () => {
    if (isLoading) return <h1>Loading...</h1>;
    const items = [];
    const data = searchResults;
    data.sort((a, b) =>
      parseFloat(
        a.price.substring(1) > parseFloat(b.price.substring(1)) ? 1 : -1
      )
    );
    if (data.length === 0) return <h1> No item found!</h1>;
    for (var i = 0; i < data.length; i++) {
      let ele = data[i];
      items.push(
        <Col xs={6} md={4} lg={2} className="mb-3">
          <Item
            key={i}
            img={ele["imageUrl"]}
            product={ele["title"]}
            price={ele["price"]}
            url={ele["detailPageURL"]}
          />
        </Col>
      );
    }
    return items;
  };

  return (
    <Row className="mt-3" style={{ textAlign: "center" }}>
      {renderItems()}
    </Row>
  );
}

export default SeachRet;
