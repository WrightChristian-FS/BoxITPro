import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import People from "../../pages/People/People";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreatePerson.css";

function CreatePerson() {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    department: "",
    office: "",
    computer: "",
    phone: "",
    deskphone: "",
    cellphone: "",
    date: "",
  });

  const handleClose = () => {
    setShow(false);
    navigate("/people");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    // Do something with DB
    event.preventDefault();
    console.log(formData);
    fetch("https://be.boxitbro.mohamedradwan.me/api/save-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        title: formData.title,
        email: formData.email,
        department: formData.department,
        office: formData.office,
        computer: formData.computer,
        phone: formData.phone,
        deskphone: formData.deskphone,
        cellphone: formData.cellphone,
        date: formData.date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data sent successfully:", data);
        if (data.message) {
          console.log("Success:", data.message);
          handleClose();
        } else if (data.errors) {
          console.log("Validation errors:", data.errors[0].msg);
          setErrorMsg(data.errors[0].msg);
        }
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  console.log("Validation errors:", errorMsg);

  const textFields = ["Name", "Title", "Email", "Department", "Office"];
  const phoneFields = ["deskphone", "cellphone", "computer", "phone"];
  return (
    <>
      <People />
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>CREATE PERSON</Modal.Title>
        </Modal.Header>
        <Modal.Body className="create-modal">
          <form onSubmit={handleSubmit}>
            {textFields.map((field) => {
              return (
                <div key={`${field.toLowerCase()}-input`}>
                  <label htmlFor={field.toLowerCase()}>{field}</label>
                  <input
                    type="text"
                    id={field.toLowerCase()}
                    onChange={handleChange}
                  />
                </div>
              );
            })}
            <div>
              <label htmlFor="date">Onboard Date</label>
              <input type="date" id="date" onChange={handleChange} />
            </div>
            {phoneFields.map((field) => {
              return (
                <div key={field.toLowerCase()}>
                  <label htmlFor={field.toLowerCase()}>{field}</label>
                  <input
                    type="text"
                    id={field.toLowerCase()}
                    onChange={handleChange}
                  />
                </div>
              );
            })}
          </form>
          {errorMsg && <div className="error-message">{errorMsg}</div>}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              CANCEL
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              CREATE
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreatePerson;
