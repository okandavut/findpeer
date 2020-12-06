import React, { useState } from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { List } from "react-content-loader";
import { PlayFill } from "react-bootstrap-icons";

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
          <List style={{ marginTop: "21px" }} />
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
                  <br />
                  <br />
                  {userInfo.videoUrl != "" && (
                    <a href={userInfo.videoUrl} target="_blank">
                      <svg
                        width="2em"
                        height="2em"
                        viewBox="0 0 16 16"
                        class="bi bi-file-play-fill"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6 5.883v4.234a.5.5 0 0 0 .757.429l3.528-2.117a.5.5 0 0 0 0-.858L6.757 5.454a.5.5 0 0 0-.757.43z"
                        />
                      </svg>
                    </a>
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
              <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default UserInformationModal;
