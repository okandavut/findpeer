import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import Loading from "../components/loading";
import Alert from "react-bootstrap/Alert";
import Link from "next/link";
import axios from "axios";
import { getSuperPeerData, getCategories } from "../api/api";

export default function Add() {
  const [superpeer, setSuperpeer] = useState("");
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [alertText, setAlertText] = useState("");

  useEffect(() => {
    setLoading(true);
    getCategories().then((value) => {
      setCategories(value);
      setLoading(false);
    });
  }, []);

  const handleCheckCategory = (event) => {
    const { target } = event;
    const { value } = target;

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

    if (categoryItem.length == 0) {
      categoryItem.push("Other");
    }

    if (superpeer == "") {
      setShow(true);
      setAlertText("Please fill Superpeer username");
    } else {
      Promise.all([getSuperPeerData(superpeer)]).then((results) => {
        if (!results[0]) {
          setShow(true);
          setAlertText("Can't Find User");
        } else {
          submitAddPeer(
            `${results[0].firstName} ${results[0].lastName}`,
            superpeer,
            results[0].avatarUrl,
            categoryItem,
            results[0].shortDescription
          );
        }
      });
    }
  }

  async function submitAddPeer(
    name,
    superpeer,
    imgUrl,
    categoryItem,
    description
  ) {
    const res = await axios
      .post("https://findsupeer-api.onrender.com/addPeer", {
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

  return (
    <>
      <Container>
        <>
          <h3 style={{ marginTop: "21px" }} className="new-peer-title">
            Add New Peer
          </h3>
          <hr />
          {loading ? (
            <Row style={{ justifyContent: "center", marginTop: "40px" }}>
              <Loading style={{ marginTop: "40px" }} />
            </Row>
          ) : (
            <>
              <Alert
                variant="danger"
                show={show}
                onClose={() => setShow(false)}
                dismissible
              >
                {alertText}
              </Alert>
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="lbl-new-peer">
                    Superpeer Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Superpeer username"
                    onChange={(e) => {
                      setSuperpeer(e.target.value);
                      setShow(false);
                    }}
                    maxLength="25"
                  />
                </Form.Group>
                <Form.Group
                  controlId="exampleForm.ControlSelect2"
                  className="new-peer-category"
                >
                  <Form.Label>
                    Select your category (multiselect) (if you want to add new
                    please{" "}
                    <a href="https://github.com/okandavut/find-superpeer/issues/new">
                      send issue
                    </a>
                    )
                  </Form.Label>
                  {categories &&
                    categories.length > 0 &&
                    categories.map((category, k) => {
                      return (
                        <Form.Check
                          key={k}
                          type="checkbox"
                          label={category.Name}
                          value={category.Name}
                          id={category.Id}
                          onChange={handleCheckCategory}
                        />
                      );
                    })}
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect2">
                  <Button
                    variant="success"
                    onClick={addNewPeer}
                    style={{ marginRight: 10 }}
                  >
                    Add
                  </Button>
                  <Link href={"/"}>
                    <Button variant="light">Cancel</Button>
                  </Link>
                </Form.Group>
              </Form>
            </>
          )}
        </>
      </Container>
    </>
  );
}
