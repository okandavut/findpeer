import { Button, Container, Row, Col } from "react-bootstrap";
import { List } from "react-content-loader";
import Link from "next/link";
import { getCategories, getPeers } from "../api/api";
import Peers from "../components/peers";
import SearchInput from "../components/searchInput";
import FilterColumn from "../components/filterColumn";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const [filteredPeerList, setFilteredPeerList] = useState(null);
  const [peerList, setPeerList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const hiddenTabletOrMobile = useMediaQuery({
    query: "(min-device-width: 992px)",
  });

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      setCurrentPage(1);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (value) {
      setSelectedCategory("");
      const newList = peerList.filter((item) => {
        return (
          item.Category.toLocaleLowerCase().includes(
            value.toLocaleLowerCase()
          ) ||
          item.Description.toLocaleLowerCase().includes(
            value.toLocaleLowerCase()
          ) ||
          item.Name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );
      });
      setFilteredPeerList(newList);
      setCurrentPage(1);
    } else {
      setFilteredPeerList(null);
    }
  };

  const getList = () => {
    if (filteredPeerList) {
      return filteredPeerList;
    }

    return peerList;
  };

  const getPeerList = (list) => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    if (!hiddenTabletOrMobile || indexOfFirstPost == indexOfLastPost) {
      return list;
    }
    return list.slice(indexOfFirstPost, indexOfLastPost);
  };

  return (
    <>
      <Container>
        {loading ? (
          <List style={{ marginTop: "21px" }} />
        ) : (
          <>
            <h3 style={{ marginTop: "21px" }}>Find Your Peer</h3>
            <hr />
            <Row>
              <FilterColumn
                categories={categories}
                filterPeersAsCategory={filterPeersAsCategory}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
              <Col
                sm={12}
                md={9}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Col className={"right-column"}>
                  <Row
                    style={{ justifyContent: "flex-end", padding: "0 15px" }}
                  >
                    <a
                      target="_blank"
                      href={
                        "https://github.com/okandavut/find-superpeer/issues/new"
                      }
                    >
                      <Button variant="primary" style={{ marginRight: "5px" }}>
                        Send Request
                      </Button>
                    </a>
                    <Link href={"add"}>
                      <Button variant="success">Add new Peer</Button>
                    </Link>
                  </Row>
                  <SearchInput handleChange={handleChange} />
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={getList().length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                  <Peers peers={getPeerList(getList())} />
                </Col>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
