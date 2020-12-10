import { Button, Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { getCategories, getPeers } from "../api/api";
import Peers from "../components/peers";
import SearchInput from "../components/searchInput";
import FilterColumn from "../components/filterColumn";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination";
import { useMediaQuery } from "react-responsive";
import Loading from "../components/loading";

export default function Home() {
  const [filteredPeerList, setFilteredPeerList] = useState(null);
  const [peerList, setPeerList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageRange, setCurrentPageRange] = useState(9);
  const [pageRangeList, setPageRangeList] = useState([
    { id: 9, name: "9/page" },
    { id: 18, name: "18/page" },
    { id: 45, name: "45/page" },
    { id: 90, name: "90/page" },
  ]);
  const hiddenTabletOrMobile = useMediaQuery({
    query: "(min-device-width: 992px)",
  });

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const alterCurrentPageRange = (range) => {
    setCurrentPageRange(range);
  };

  const selectedPageRange = (range) => {
    return pageRangeList.filter((list) => list.id == range)[0];
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([getCategories(), getPeers()]).then((results) => {
      setCategories(results[0]);
      setPeerList(results[1]);
      pageRangeList.push({ id: results[1].length, name: "All" });
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
    const pageSize = selectedPageRange(currentPageRange).id;
    const indexOfLastPost = currentPage * pageSize;
    const indexOfFirstPost = indexOfLastPost - pageSize;

    if (!hiddenTabletOrMobile || indexOfFirstPost == indexOfLastPost) {
      return list;
    }
    return list.slice(indexOfFirstPost, indexOfLastPost);
  };

  const getPageItemList = () => {
    const items = [];
    for (
      let i = 1;
      i <= Math.ceil(getList().length / selectedPageRange(currentPageRange).id);
      i++
    ) {
      items.push(i);
    }
    return items;
  };

  return (
    <>
      <Container>
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
                <Row style={{ justifyContent: "flex-end", padding: "0 15px" }}>
                  <Link href={"request"}>
                    <Button variant="primary" style={{ marginRight: "5px" }}>
                      Send Request
                    </Button>
                  </Link>
                  <Link href={"add"}>
                    <Button variant="success">Add new Peer</Button>
                  </Link>
                </Row>

                <SearchInput handleChange={handleChange} />
                <Pagination
                  pageRangeList={pageRangeList}
                  selectedPageRange={selectedPageRange(currentPageRange)}
                  alterCurrentPageRange={alterCurrentPageRange}
                  pageItemList={getPageItemList()}
                  paginate={paginate}
                  currentPage={currentPage}
                />
                {loading ? (
                  <Row style={{ justifyContent: "center", marginTop: "40px" }}>
                    <Loading style={{ marginTop: "40px" }} />
                  </Row>
                ) : (
                  <Peers peers={getPeerList(getList())} />
                )}
              </Col>
            </Col>
          </Row>
        </>
      </Container>
    </>
  );
}
