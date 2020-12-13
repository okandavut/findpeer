import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import Link from "next/link";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useRouter } from "next/router";

export default function Request() {
    const router = useRouter();
    const [superpeer, setSuperpeer] = useState("");
    const [request, setRequest] = useState("");
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const sendMyRequest = () => {
        if (superpeer === "" || request === "") setShowError(true);
        else {
            var data = {};
            axios
                .post("https://api.emailjs.com/api/v1.0/email/send", {
                    service_id: "service_go15bzc",
                    template_id: "template_yhl7inm",
                    user_id: "user_RaEsuJbQOzn0PxVZQS98v",
                    template_params: {
                        from_name: `${superpeer} User Request`,
                        user: superpeer,
                        message: request,
                    },
                })
                .then(function () {
                    setShowSuccess(true);
                    setInterval(() => {
                        router.push("/");
                    }, 1000);
                });
        }
    };

    return (
        <>
            <Container>
                <>
                    <h3 style={{ marginTop: "21px" }} className='submit-title'>Submit Request to Author</h3>
                    <p className='submit-title-info'>
                        Submit update, delete or change request about your profile or
                        system.
                    </p>
                    <hr />
                    <>
                        <Alert
                            variant="danger"
                            show={showError}
                            onClose={() => setShow(false)}
                            dismissible
                        >
                            Your request sent to author. It will be resolved quickly.
                        </Alert>
                        <Alert
                            variant="success"
                            show={showSuccess}
                            onClose={() => setShow(false)}
                            dismissible
                        >
                            Your Email Sent! :) (going to homepage..)
                        </Alert>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label className='lbl-submit-input'>Superpeer Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Superpeer username"
                                    onChange={(e) => {
                                        setSuperpeer(e.target.value);
                                        setShowError(false);
                                    }}
                                    maxLength="25"
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label className='lbl-submit-input'>Describe Your Request</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    onChange={(e) => {
                                        setRequest(e.target.value);
                                        setShowError(false);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="html_message">
                                <Button variant="success" onClick={sendMyRequest} style={{marginRight: 10}}>
                                    Send
                                </Button>
                                <Link href={"/"}>
                                    <Button variant="light">Cancel</Button>
                                </Link>
                            </Form.Group>
                        </Form>
                    </>
                </>
            </Container>
        </>
    );
}
