import Head from "next/head";
import { useEffect, useState } from "react";
import {
    Card,
    Button,
    Container,
    Row,
    Col,
    ListGroup,
    Form,
} from "react-bootstrap";
import axios from "axios";

export default function Add() {
    const [name, setName] = useState("");
    const [superpeer, setSuperpeer] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const [categories, setCategories] = useState([]);
    const [hobbies, setHobbies] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    var handleInputChange = (event) => {
        const target = event.target;
        var value = target.value;

        if (target.checked) {
            hobbies[value] = value;
        } else {
            hobbies.splice(value, 1);
        }
    }

    async function addNewPeer() {
        var categoryItem = categories.map((item, i) => {
            if (hobbies[item.Name] == item.Name) {
                return item.Name;
            }
            else {
                return undefined;
            }
        }).filter(function (element) {
            return element !== undefined;
        });;

        const res = await axios.post("https://findsupeerbackend.herokuapp.com/addPeer",
            {
                "Name": name,
                "Superpeer": superpeer,
                "ImgUrl": imgUrl,
                "Category": categoryItem.join(),
                "Description": description,
            }).then(res => {
                if (res.status == 200) {
                    alert("Successfully added.");
                    location.reload();
                }
            });

    }

    async function getCategories() {

        const res = await axios.get("https://findsupeerbackend.herokuapp.com/categories");

        console.log(res);
        setCategories(res.data);
    }

    return (
        <>
            <Container>
                <br />

                <h3>Add New Peer</h3>
                <br />
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Name Surname</Form.Label>
                        <Form.Control type="text" placeholder="Name Surname" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Superpeer URL</Form.Label>
                        <Form.Control type="text" placeholder="Superpeer" onChange={(e) => setSuperpeer(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text" placeholder="Image Url" onChange={(e) => setImgUrl(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>Select your category (multiselect) (if you want to add new please <a href="https://github.com/okandavut/find-superpeer/issues/new">send issue</a>)</Form.Label>
                        {categories
                            ? categories.map((category, k) => {
                                return (<Form.Check key={k} type="checkbox" label={category.Name} value={category.Name} onChange={handleInputChange.bind(this)} />);

                            }) : ""}
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Button variant="primary" onClick={addNewPeer}>Add</Button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}
