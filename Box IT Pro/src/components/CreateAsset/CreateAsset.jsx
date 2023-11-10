import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./CreateAsset.css";
import Assets from "../../pages/Assets/Assets";

function CreateAsset() {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    serialnumber: "",
    make: "",
    purchaseprice: "",
    model: "",
    assigneduser: "",
    laptop: false,
    mobile: false,
    desktop: false,
    date: "",
  });

  const handleClose = () => {
    setShow(false);
    navigate("/assets");
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
    fetch("https://be.boxitbro.mohamedradwan.me/api/save-asset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        serialnumber: formData.serialnumber,
        make: formData.make,
        purchaseprice: formData.purchaseprice,
        model: formData.model,
        assigneduser: formData.assigneduser,
        laptop: formData.laptop,
        mobile: formData.mobile,
        desktop: formData.desktop,
        date: formData.date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data sent successfully:", data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  const textFields = [
    "name",
    "serialnumber",
    "Make",
    "purchaseprice",
    "model",
    "assigneduser",
  ];
  const devices = ["laptop", "mobile", "desktop"];
  return (
    <>
      <Assets />
      <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
        <Modal.Header>
          <Modal.Title>CREATE ASSET</Modal.Title>
        </Modal.Header>
        <Modal.Body className="create-modal">
          <form onSubmit={handleSubmit}>
            <div className="device-input d-flex flex-column">
              <p>Device Type</p>
              <section className="d-inline-flex justify-content-start">
                {devices.map((device) => {
                  return (
                    <>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id={`${device.toLowerCase()}`}
                        onChange={handleChange}
                      />
                      <label
                        className="btn btn-secondary"
                        htmlFor={`${device.toLowerCase()}`}
                      >
                        {device}
                      </label>
                    </>
                  );
                })}
              </section>
            </div>
            {textFields.map((field) => {
              return (
                <div id={`${field.toLowerCase()}-input`} key={field}>
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
              <label htmlFor="date">Purchase Date</label>
              <input type="date" id="date" onChange={handleChange} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            CREATE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateAsset;
