import { ListGroup } from 'react-bootstrap';

const Categories = ({ categories, filterPeersAsCategory, setCurrentPage }) => {
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
                  setCurrentPage(1);
                }}
              >
                {category.Name}
              </ListGroup.Item>
            );
          })
        : ''}
    </>
  );
};

export default Categories;
