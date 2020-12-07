import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import Link from "next/link";
import Alert from "react-bootstrap/Alert";

export default function Request() {
  const [superpeer, setSuperpeer] = useState("");
  const [request, setRequest] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sendMyRequest = () => {
    if (superpeer === "") setShowError(true);
    if (request === "") setShowError(true);
  };
  return (
    <>
      <Container>
        <>
          <h3 style={{ marginTop: "21px" }}>Submit Request to Author</h3>
          <p>
            Submit update, delete or change request about your profile or
            system.{" "}
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
              Please fill all the informations.
            </Alert>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Superpeer Username</Form.Label>
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
                <Form.Label>Describe Your Request</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => {
                    setRequest(e.target.value);
                    setShowError(false);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlSelect2">
                <Button variant="success" onClick={sendMyRequest}>
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
