import { Form, Row, Col } from "react-bootstrap";

const SearchInput = ({handleChange}) => {
  return (
    <Row style={{ justifyContent: "flex-end" }} className={"mt-3"}>
      <Col lg={6} md={8} sm={24}>
        <Form.Control
          type="text"
          placeholder="Search with Name or Description"
          onChange={handleChange}
        />
      </Col>
    </Row>
  );
};

export default SearchInput;
