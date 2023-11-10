import React, { useState } from "react";
import People from "../../pages/People/People";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function DeletePerson(props) {
  const [show, setShow] = useState(true);

  const navigate = useNavigate();

 

  const handleClose = () => {
    setShow(false);
    navigate("/people");
  };

  

  const handleDelete = (e) => {
    e.preventDefault();
    const personId = new URLSearchParams({
      userId: props.personId,
    }).toString();

    fetch(`https://be.boxitbro.mohamedradwan.me/api/delete-user?${personId}`, {
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
          <Modal.Title>DELETE PERSON</Modal.Title>
        </Modal.Header>
        <Modal.Body className="create-modal">
          <div>
            <label>Person ID</label>
            <p>Please confirm deleting this person.</p>
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

export default DeletePerson;
