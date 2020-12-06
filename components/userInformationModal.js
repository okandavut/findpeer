import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { Facebook } from "react-content-loader";

const UserInformationModal = ({
  show,
  onHide,
  userInfo,
  superpeer,
  loading,
}) => {
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={onHide}
      >
        {loading ? (
          <Facebook style={{ margin: "21px" }} />
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {userInfo.firstName} {userInfo.lastName}
                <span>&nbsp;&#128075;</span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col sm={12} md={3} style={{ textAlign: "center" }}>
                  {userInfo.videoUrl == "" && (
                    <Image
                      src={userInfo.avatarUrl}
                      rounded
                      className="img-fluid z-depth-1-half rounded-circle"
                      style={{
                        width: "10rem",
                        height: "10rem",
                        margin: "0 0 0 0",
                      }}
                    />
                  )}
                  <br />
                  <br />
                  {userInfo.videoUrl != "" && (
                    <video
                      src={userInfo.videoUrl}
                      controls
                      type="video/mp4"
                      poster={userInfo.avatarUrl}
                      style={{
                        width: "10rem",
                        height: "15rem",
                        margin: "-43px 0 0 0",
                      }}
                    ></video>
                  )}
                </Col>
                <Col sm={12} md={9} style={{ textAlign: "center" }}>
                  <p className="title mb-0">
                    {userInfo.firstName} {userInfo.lastName}
                  </p>
                  <p className="text-muted">{userInfo.shortDescription}</p>
                  <p className="card-text">{userInfo.longDescription}</p>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button href={superpeer} target="_blank">
                Let's Talk
              </Button>
              <Button variant="danger" onClick={onHide}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default UserInformationModal;
