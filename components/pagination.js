import React from "react";
import {
  Col,
  Pagination as BPagination,
  Row,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";
import styled from 'styled-components';

const StyledPagination = styled(BPagination)`
  .page-item .page-link {
    background: ${({ theme }) => theme.paginationBgColor} ;
    color: ${({ theme }) => theme.paginationFgColor} ;
    border-color: ${({ theme }) => theme.paginationBorderColor};
  }
  .active .page-link {
    background: ${({ theme }) => theme.paginationActiveBgColor} ;
    color: ${({ theme }) => theme.paginationActiveFgColor} ;
    border-color: ${({ theme }) => theme.paginationActiveBorderColor};
  }
`;

const Pagination = ({
  pageRangeList,
  selectedPageRange,
  alterCurrentPageRange,
  pageItemList,
  paginate,
  currentPage,
}) => {
  return (
    <Row
      style={{ justifyContent: "flex-end", padding: "0 15px" }}
      className={"mt-3 hidden-lg"}
    >
      {pageItemList.length > 1 && (
        <Col md={20}>
          <StyledPagination size={"sm"}>
            {pageItemList.map((item) => (
              <BPagination.Item
                key={item}
                onClick={() => paginate(item)}
                active={item === currentPage}
              >
                {item}
              </BPagination.Item>
            ))}
          </StyledPagination>
        </Col>
      )}

      {[DropdownButton].map((DropdownType, idx) => (
        <DropdownType
          as={ButtonGroup}
          key={idx}
          id={`dropdown-button-drop-${idx}`}
          size="sm"
          title={selectedPageRange.name}
          style={{ display: "block" }}
        >
          {pageRangeList.map((pageSize, i) => (
            <Dropdown.Item
              eventKey={pageSize.id}
              onClick={() => alterCurrentPageRange(pageSize.id)}
              key={i}
            >
              {pageSize.name}
            </Dropdown.Item>
          ))}
        </DropdownType>
      ))}
    </Row>
  );
};

export default Pagination;
