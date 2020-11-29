import React from "react";
import { Row, Card, Col, Button } from "react-bootstrap";

const Peers = ({ peers }) => {
  return (
    <Row className={"mt-3"}>
      {peers
        ? peers.map((peer, i) => {
            return (
              <Col xs={12} s={6} md={6} lg={4} key={i} className={"mb-2"}>
                <Card
                  style={{
                    maxHeight: "50rem",
                    textAlign: "center",
                    height: "100%",
                  }}
                  key={i}
                >
                  <Card.Img
                    variant="top"
                    src={peer.ImgUrl}
                    alt="peerPicture"
                    style={{
                      width: "13rem",
                      maxHeight: "50rem",
                      margin: "1rem auto 1rem auto",
                    }}
                  />
                  <Card.Body
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Card.Title>{peer.Name}</Card.Title>
                    <Card.Text>{peer.Description}</Card.Text>
                    <Card.Text>
                      <b>{peer.Category}</b>
                    </Card.Text>
                    <Button
                      variant="primary"
                      target="_blank"
                      href={peer.Superpeer}
                      style={{
                        marginTop: "auto"
                      }}
                    >
                      Let's Talk
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        : null}
    </Row>
  );
};

export default Peers;
