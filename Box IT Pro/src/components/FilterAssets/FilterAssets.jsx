import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./FilterAssets.css";
import Assets from "../../pages/Assets/Assets";

function FilterAssets() {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: [],
    make: [],
    model: [],
    assigned: false,
    warranty: false,
  });

  const handleClose = () => {
    setShow(false);
    navigate("/assets");
  };

  const handleCheckboxChange = (category) => (event) => {
    const value = event.target.id;
    setFormData((prevData) => {
      if (category === "assigned" || category === "warranty") {
        return { ...prevData, [category]: event.target.checked };
      }
      const array = [...prevData[category]];
      if (event.target.checked) {
        array.push(value);
      } else {
        const index = array.indexOf(value);
        if (index > -1) {
          array.splice(index, 1);
        }
      }
      return { ...prevData, [category]: array };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const queryString = new URLSearchParams({
      type: formData.type,
      make: formData.make,
      model: formData.model,
      assigned: formData.assigned,
      warranty: formData.warranty,
    }).toString();

    console.log(queryString);

    fetch(`https://be.boxitbro.mohamedradwan.me/api/get-asset?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetched successfully:", data);
        handleClose();
        navigate("/assets", { state: { data: data } });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const devices = ["Laptop", "Phone", "Desktop"];
  const makes = ["HP", "Dell", "Apple", "Samsung"];
  const models = ["G5", "Latitude", "Wolf", "FOB"];

  return (
    <>
      <Assets />
      <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
        <Modal.Header>
          <Modal.Title>FILTER ASSET</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="filter-form" onSubmit={handleSubmit}>
            <div>
              <input
                type="checkbox"
                name="assigned"
                id="assigned-input"
                onChange={handleCheckboxChange("assigned")}
              />
              <label htmlFor="assigned-input">Assigned</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="warranty"
                id="warranty-input"
                onChange={handleCheckboxChange("warranty")}
              />
              <label htmlFor="warranty-input">Active Warranty</label>
            </div>
            <div className="group">
              <p>Device Type</p>
              <hr />
              <section>
                {devices.map((device) => {
                  return (
                    <>
                      <input
                        type="checkbox"
                        className="btn-check"
                        name="options-devices"
                        id={device.toLowerCase()}
                        onChange={handleCheckboxChange("type")}
                      />
                      <label
                        className="btn btn-secondary"
                        htmlFor={device.toLowerCase()}
                      >
                        {device}
                      </label>
                    </>
                  );
                })}
              </section>
            </div>
            <div className="group">
              <p>Make</p>
              <hr />
              <section>
                {makes.map((make) => {
                  return (
                    <>
                      <input
                        type="checkbox"
                        className="btn-check"
                        name="options-makes"
                        id={make.toLowerCase()}
                        onChange={handleCheckboxChange("make")}
                      />
                      <label
                        className="btn btn-secondary"
                        htmlFor={make.toLowerCase()}
                      >
                        {make}
                      </label>
                    </>
                  );
                })}
              </section>
            </div>
            <div className="group">
              <p>Model Type</p>
              <hr />
              <section>
                {models.map((model) => {
                  return (
                    <>
                      <input
                        type="checkbox"
                        className="btn-check"
                        name="options-models"
                        id={model.toLowerCase()}
                        onChange={handleCheckboxChange("model")}
                      />
                      <label
                        className="btn btn-secondary"
                        htmlFor={model.toLowerCase()}
                      >
                        {model}
                      </label>
                    </>
                  );
                })}
              </section>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" type="submit" form="filter-form">
            FILTER
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FilterAssets;
