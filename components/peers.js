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

const Peers = ({ peers, loading }) => {
  if (loading) {
    //TODO :Add loading
  }
  return (
    <>
      {peers
        ? peers.map((peer, i) => {
            return (
              <Col
                xs={12}
                s={6}
                md={6}
                lg={4}
                key={i}
                style={{ marginBottom: "1rem" }}
              >
                <Card
                  style={{
                    maxHeight: "50rem",
                    textAlign: "center",
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
                  <Card.Body>
                    <Card.Title>{peer.Name}</Card.Title>
                    <Card.Text>
                      {peer.Description} <br />
                      <b>{peer.Category}</b>
                    </Card.Text>
                    <Button
                      variant="primary"
                      target="_blank"
                      href={peer.Superpeer}
                    >
                      Let's Talk
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        : ""}
    </>
  );
};

export default Peers;
