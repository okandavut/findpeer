import React, { useState } from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import { getSuperPeerData, getImageAsBase64 } from "../api/api";
import UserInformationModal from "../components/userInformationModal";

const Peers = ({ peers }) => {
  const [modalShow, setModalShow] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [superpeer, setSuperpeer] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("peers", peers);
  const getSuperpeerInformation = (username) => {
    username = username.split("/")[3];
    setLoading(true);
    Promise.all([getSuperPeerData(username)]).then((results) => {
      getImageAsBase64(results[0].avatarUrl).then((data) => {
        results[0].avatarUrl = data;
        setUserInfo(results[0]);
        setLoading(false);
      });
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
                      src={
                        peer.ImgUrl &&
                        peer.ImgUrl.includes("https://storage.googleapis.com")
                          ? peer.ImgUrl
                          : "/default.png"
                      }
                      alt="peerPicture"
                      style={{
                        width: "5rem",
                        maxHeight: "5rem",
                        margin: "1rem auto 1rem auto",
                        borderRadius: "50px",
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
                        id="more-information-button"
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
