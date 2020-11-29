import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { List } from "react-content-loader";
import Link from "next/link";
import { getCategories } from "../api/api";
import axios from "axios";

export default function Add() {
  const [name, setName] = useState("");
  const [superpeer, setSuperpeer] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((value) => {
      setCategories(value);
      setLoading(false);
    });
  }, []);

  const handleCheckCategory = (event) => {
    const target = event.target;
    const value = target.value;

    if (target.checked) {
      checkedCategories[value] = value;
    } else {
      checkedCategories.splice(value, 1);
    }
  };

  async function addNewPeer() {
    const categoryItem = categories
      .map((item, i) => {
        if (checkedCategories[item.Name] == item.Name) {
          return item.Name;
        } else {
          return undefined;
        }
      })
      .filter(function (element) {
        return element !== undefined;
      });

    if (name == "" || superpeer == "") {
      alert("Please fill the information");
    }
    if (categoryItem.length == 0) {
      categoryItem.push("Other");
    }
    if (name != "" && superpeer != "" && categoryItem.length != 0) {
      const res = await axios
        .post("https://findsupeerbackend.herokuapp.com/addPeer", {
          Name: name,
          Superpeer: superpeer,
          ImgUrl: imgUrl,
          Category: categoryItem.join(),
          Description: description,
        })
        .then((res) => {
          if (res.status == 200) {
            alert("Successfully added.");
            location.reload();
          }
        });
    }
  }

  return (
    <>
      <Container>
        {loading ? (
          <List style={{ marginTop: "21px" }} />
        ) : (
          <>
            <h3 style={{ marginTop: "21px" }}>Add New Peer</h3>
            <hr />
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Name Surname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name Surname"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Superpeer Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Superpeer username"
                  onChange={(e) => setSuperpeer(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Image Url"
                  onChange={(e) => setImgUrl(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>
                  Select your category (multiselect) (if you want to add new
                  please{" "}
                  <a href="https://github.com/okandavut/find-superpeer/issues/new">
                    send issue
                  </a>
                  )
                </Form.Label>
                {categories && categories.length > 0
                  ? categories.map((category, k) => {
                      return (
                        <Form.Check
                          key={k}
                          type="checkbox"
                          label={category.Name}
                          value={category.Name}
                          onChange={handleCheckCategory.bind(this)}
                        />
                      );
                    })
                  : ""}
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect2">
                <Button variant="success" onClick={addNewPeer}>
                  Add
                </Button>{" "}
                <Link href={"/"}>
                  <Button variant="light">Cancel</Button>
                </Link>
              </Form.Group>
            </Form>
          </>
        )}
      </Container>
    </>
  );
}
