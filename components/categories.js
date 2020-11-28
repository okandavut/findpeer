import { ListGroup } from "react-bootstrap";

const Categories = ({ categories, filterPeersAsCategory }) => {
  return (
    <>
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
    </>
  );
};

export default Categories;
