import React from "react";
import { Col, Pagination as BPagination, Row } from "react-bootstrap";
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const getItems = () => {
    const items = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      items.push(i);
    }

    return items;
  };

  return (
    <Row
      style={{ justifyContent: "flex-end", padding: "0 15px" }}
      className={"mt-3 hidden-lg"}
    >
      <Col md={24}>
        <BPagination size={"sm"}>
          {getItems().map((item) => (
            <BPagination.Item
              key={item}
              onClick={() => paginate(item)}
              active={item === currentPage}
            >
              {item}
            </BPagination.Item>
          ))}
        </BPagination>
      </Col>
    </Row>
  );
};

export default Pagination;
