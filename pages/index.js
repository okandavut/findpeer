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
import Peers from "../components/peers";
import Pagination from "../components/pagination";
import Categories from "../components/categories";

const Home = () => {
  const [peerData, setPeerData] = useState([]);
  const [peerList, setPeerList] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [currentPosts, setCurrentPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  //Get Current Posts
  var currentPosts = setNewPeerList(peerList);
  //Chnage method
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getInitialData();
    getCategories().then((value) => setCategories(value));
  }, []);

  function getInitialData() {
    setLoading(true);
    getPeers().then((value) => {
      setPeerList(value);
      setPeerData(value);
    });
    currentPosts = setNewPeerList(peerList);
    setLoading(false);
  }

  const filterPeersAsCategory = (category) => {
    if (category == "clear") getInitialData();
    else {
      var newList = peerData.filter((item) => {
        return item.Category.toLowerCase().includes(category.toLowerCase());
      });
      setPeerList(newList);
      currentPosts = setNewPeerList(newList);
    }
  };

  function setNewPeerList(list) {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    if (indexOfFirstPost == indexOfLastPost) return list;
    return list.slice(indexOfFirstPost, indexOfLastPost);
  }

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
        currentPosts = setNewPeerList(newList);
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
          <Col xs={1}>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={peerList.length}
              paginate={paginate}
            />
          </Col>
        </Row>
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
              <Categories
                categories={categories}
                filterPeersAsCategory={filterPeersAsCategory}
              />
            </ListGroup>
          </Col>
          <Col sm={12} md={9} style={{ display: "flex", flexDirection: "row" }}>
            <Col>
              <Row>
                <Peers peers={currentPosts} loading={loading} />
              </Row>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
