import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  Form,
} from "react-bootstrap";
import axios from "axios";
import Link from "next/link";
import { getCategories, getPeers } from "../api/api";

export default function Home() {
  const [peerData, setPeerData] = useState([]);
  const [peerList, setPeerList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getInitialData();
    getCategories().then((value) => setCategories(value));
  }, []);

  function getInitialData() {
    getPeers().then((value) => {
      setPeerList(value);
      setPeerData(value);
    });
  }

  const filterPeersAsCategory = (category) => {
    if (category == "clear") getInitialData();
    else {
      var newList = peerData.filter((item) => {
        return item.Category.toLowerCase().includes(category.toLowerCase());
      });
      setPeerList(newList);
    }
  };

  const enterPressed = () => {
    let code = event.keyCode || event.which;

    if (code === 13 || event.button == 0) {
      if (searchText) {
        var newList = peerData.filter((item) => {
          return (
            item.Description.toLowerCase().includes(searchText.toLowerCase()) ||
            item.Name.toLowerCase().includes(searchText.toLowerCase())
          );
        });
        setPeerList(newList);
      } else {
        getInitialData();
      }
    }
  };

  return (
    <>
      <Container>
        <br />

        <h3>Find Your Peer</h3>
        <br />
        <Row>
          <Col xs={7}>
            <Form.Control
              type="text"
              placeholder="Search with Name or Description"
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={enterPressed.bind(this)}
            />
          </Col>
          <Col xs={1}>
            <Button variant="primary" onClick={enterPressed.bind(this)}>
              Search
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={12} md={3} style={{ marginBottom: "1rem" }}>
            <ListGroup>
              <ListGroup.Item
                action
                onClick={(e) => {
                  filterPeersAsCategory("clear");
                }}
              >
                Clear Filter
              </ListGroup.Item>
              <Link href={"add"}>
                <ListGroup.Item action>Add new Peer</ListGroup.Item>
              </Link>
            </ListGroup>
            <br></br>
            <ListGroup>
              {categories
                ? categories.map((category, k) => {
                    return (
                      <ListGroup.Item
                        key={k}
                        action
                        onClick={(e) => {
                          filterPeersAsCategory(category.Name);
                        }}
                      >
                        {category.Name}
                      </ListGroup.Item>
                    );
                  })
                : ""}
            </ListGroup>
          </Col>
          <Col sm={12} md={9} style={{ display: "flex", flexDirection: "row" }}>
            <Col>
              <Row>
                {peerList
                  ? peerList.map((peer, i) => {
                      return (
                        <Col
                          xs={12}
                          s={6}
                          md={6}
                          lg={4}
                          key={i}
                          style={{ marginBottom: "1rem" }}
                        >
                          <Card
                            style={{
                              maxHeight: "50rem",
                              textAlign: "center",
                            }}
                            key={i}
                          >
                            <Card.Img
                              variant="top"
                              src={peer.ImgUrl}
                              style={{
                                width: "13rem",
                                maxHeight: "50rem",
                                margin: "1rem auto 1rem auto",
                              }}
                            />
                            <Card.Body>
                              <Card.Title>{peer.Name}</Card.Title>
                              <Card.Text>
                                {peer.Description} <br />
                                <b>{peer.Category}</b>
                              </Card.Text>
                              <Button
                                variant="primary"
                                target="_blank"
                                href={peer.Superpeer}
                              >
                                Let's Talk
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })
                  : ""}
              </Row>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
}
