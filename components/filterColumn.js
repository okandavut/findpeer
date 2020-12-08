import { Col, ListGroup } from "react-bootstrap";

const FilterColumn = ({ categories, filterPeersAsCategory, setSelectedCategory, selectedCategory }) => {
  const sortByName = (a, b) => a.Name !== 'Other' && a.Name.localeCompare(b.Name);
  return (
    <Col className={"filter-column hidden-lg"} sm={12} md={3}>
      <ListGroup>
        <ListGroup.Item
          action
          onClick={(e) => {
            filterPeersAsCategory("clear");
            setSelectedCategory("");
          }}
        >
          Clear Filter
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
  );
};

export default FilterColumn;
