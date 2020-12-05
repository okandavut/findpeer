import React, { useState } from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import { getSuperPeerData } from "../api/api";
import UserInformationModal from "../components/userInformationModal";

const Peers = ({ peers }) => {
  const [modalShow, setModalShow] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [superpeer, setSuperpeer] = useState("");
  const [loading, setLoading] = useState(false);

  const getSuperpeerInformation = (username) => {
    username = username.split("/")[3];
    setLoading(true);
    Promise.all([getSuperPeerData(username)]).then((results) => {
      setUserInfo(results[0]);
      setLoading(false);
    });
  };

  return (
    <>
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
                        width: "5rem",
                        maxHeight: "5rem",
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
                        onClick={() => {
                          setModalShow(true);
                          setSuperpeer(peer.Superpeer);
                          getSuperpeerInformation(peer.Superpeer);
                        }}
                        style={{
                          marginTop: "auto",
                        }}
                      >
                        More Information
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          : null}
      </Row>
      {userInfo && (
        <UserInformationModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            setUserInfo({});
          }}
          userInfo={userInfo}
          superpeer={superpeer}
          loading={loading}
        />
      )}
    </>
  );
};

export default Peers;
