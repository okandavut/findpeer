import { useCallback, useEffect, useState } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  Form,
} from "react-bootstrap";
import { List } from "react-content-loader";
import Link from "next/link";
import { getCategories, getPeers } from "../api/api";

export default function Home() {
  const [filteredPeerList, setFilteredPeerList] = useState(null);
  const [peerList, setPeerList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([getCategories(), getPeers()]).then((results) => {
      setCategories(results[0]);
      setPeerList(results[1]);
      setLoading(false);
    });
  }, []);

  const filterPeersAsCategory = (category) => {
    if (category == "clear") setFilteredPeerList(null);
    else {
      const newList = peerList.filter((item) => {
        return item.Category.toLowerCase().includes(category.toLowerCase());
      });
      setFilteredPeerList(newList);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (value) {
      setSelectedCategory("");
      const newList = peerList.filter((item) => {
        return (
          item.Description.toLocaleLowerCase().includes(
            value.toLocaleLowerCase()
          ) || item.Name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );
      });
      setFilteredPeerList(newList);
    } else {
      setFilteredPeerList(null);
    }
  };

  const GetPeerList = () => {
    if (filteredPeerList) {
      return filteredPeerList;
    }

    return peerList;
  };

  const sortByName = (a, b) => a.Name !== 'Other' && a.Name.localeCompare(b.Name);

  return (
    <>
      <Container>
        {loading ? (
          <List style={{ marginTop: "21px" }} />
        ) : (
          <>
            <h3 style={{ marginTop: "21px" }}>Find Your Peer</h3>
            <hr/>
            <Row>
              <Col className={"filter-column"} sm={12} md={3}>
                <ListGroup>
                  <ListGroup.Item
                    action
                    onClick={(e) => {
                      filterPeersAsCategory("clear");
                      setSelectedCategory("");
                    }}
                  >
                    Clear Category Filter
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup className={"mt-4"}>
                  {categories
                    ? categories.sort(sortByName).map((category, k) => {
                        return (
                          <ListGroup.Item
                            key={k}
                            active={category.Name === selectedCategory}
                            action
                            onClick={(e) => {
                              setSelectedCategory(category.Name);
                              filterPeersAsCategory(category.Name);
                            }}
                          >
                            {category.Name}
                          </ListGroup.Item>
                        );
                      })
                    : null}
                </ListGroup>
              </Col>
              <Col
                sm={12}
                md={9}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Col className={"add-button"}>
                  <Row
                    style={{ justifyContent: "flex-end", padding: "0 15px" }}
                  >
                    <Link href={"add"}>
                      <Button variant="success">Add new Peer</Button>
                    </Link>
                  </Row>
                  <Row
                    style={{ justifyContent: "flex-end" }}
                    className={"mt-3"}
                  >
                    <Col lg={6} md={8} sm={24}>
                      <Form.Control
                        type="text"
                        placeholder="Search with Name or Description"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className={"mt-3"}>
                    {GetPeerList()
                      ? GetPeerList().map((peer, i) => {
                          return (
                            <Col
                              xs={12}
                              s={6}
                              md={6}
                              lg={4}
                              key={i}
                              className={"mb-2"}
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
                                  <Card.Text>{peer.Description}</Card.Text>
                                  <Card.Text>
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
                      : null}
                  </Row>
                </Col>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
