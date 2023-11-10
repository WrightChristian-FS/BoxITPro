import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function DeleteAsset(props) {
  const [show, setShow] = useState(true);

  const navigate = useNavigate();

  

  const handleClose = () => {
    setShow(false);
    navigate("/assets");
  };

  

  const handleDelete = (e) => {
    e.preventDefault();
    const assetId = new URLSearchParams({
      assetId: props.assetId,
    }).toString();

    fetch(`https://be.boxitbro.mohamedradwan.me/api/delete-asset?${assetId}`, {
      method: "POST",
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        props.onSuccess();
        handleClose();
      })
      .catch((error) => {});
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>DELETE ASSET</Modal.Title>
        </Modal.Header>
        <Modal.Body className="create-modal">
          <div>
            <label>Asset ID</label>
            <p>Please confirm deleting this Asset.</p>
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              CANCEL
            </Button>
            <Button variant="primary" type="submit" onClick={handleDelete}>
              DELETE
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteAsset;
