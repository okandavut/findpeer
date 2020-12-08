import React from "react";
import { Col, Pagination as BPagination,  Row, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";

const Pagination = ({ pageRangeList, selectedPageRange, alterCurrentPageRange, pageItemList, paginate, currentPage }) => {
  
    return (
      <Row
        style={{ justifyContent: "flex-end", padding: "0 15px" }}
        className={"mt-3 hidden-lg"}
      >
        {
          pageItemList.length > 1 && 
          (
            <Col md={20}>
                <BPagination size={"sm"}>
                  {
                    pageItemList.map((item) => (
                      <BPagination.Item
                        key={item}
                        onClick={() => paginate(item)}
                        active={item === currentPage}
                      >
                        {item}
                      </BPagination.Item>
                    ))
                  }
                </BPagination>
              </Col>
            )
         }
        
        {
          [DropdownButton].map((DropdownType, idx) => (
            <DropdownType
              as={ButtonGroup}
              key={idx}
              id={`dropdown-button-drop-${idx}`}
              size="sm"
              title={selectedPageRange.name}
            >
              {
                pageRangeList.map((pageSize, i) => (
                  <Dropdown.Item 
                    eventKey={pageSize.id} 
                    onClick={() => alterCurrentPageRange(pageSize.id)} 
                    key={i}>{pageSize.name}
                  </Dropdown.Item>
                ))
              }
            </DropdownType>
          ))
        }
      </Row>
    )
};

export default Pagination;
