import React, { useState } from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { List } from "react-content-loader";

const UserInformationModal = ({ show, onHide, userInfo, superpeer, loading }) => {
    
  
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
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image
                src={userInfo.avatarUrl}
                rounded
                style={{
                  width: "25rem",
                  maxHeight: "25rem",
                  margin: "1rem auto 1rem auto",
                }}
              />
              <h5>{userInfo.shortDescription}</h5>
              <p>{userInfo.longDescription}</p>
              {userInfo.videoUrl != "" ? (
                <a href={userInfo.videoUrl} target="_blank">
                  Click for video.
                </a>
              ) : (
                ""
              )}
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
