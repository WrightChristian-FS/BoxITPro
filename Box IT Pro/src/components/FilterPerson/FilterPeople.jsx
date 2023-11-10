import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./FilterPeople.css";
import People from "../../pages/People/People";

function FilterPeople() {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    department: [],
    title: [],
    office: [],
  });

  const handleClose = () => {
    setShow(false);
    navigate("/people");
  };

  const handleCheckboxChange = (category) => (event) => {
    const value = event.target.id;
    setFormData((prevData) => {
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
      department: formData.department.join(","),
      title: formData.title.join(","),
      office: formData.office.join(","),
    }).toString();

    fetch(`https://be.boxitbro.mohamedradwan.me/api/get-user?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetched successfully:", data);
        setShow(false);
        
        navigate("/people", { state: { data: data } });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const departments = [
    "Digital Operations",
    "Customer Success",
    "Sales",
    "Engineering",
    "Quality",
    "Facilities",
  ];
  const titles = [
    "Marketing Manager",
    "Janitor",
    "IT Engineer",
    "QA Engineer",
    "Customer Serv Rep",
    "Jr. Web Dev",
    "Sales Rep",
    "DEVOPS ENG II",
    "HR Manager",
    "Network Tech",
    "CEO",
  ];
  const offices = [
    "Los Angles",
    "New York",
    "Miami",
    "Chicago",
    "Tijuana",
    "Austin",
  ];
  return (
    <>
      <People />
      <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
        <Modal.Header>
          <Modal.Title>FILTER PEOPLE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="filter-form-people" onSubmit={handleSubmit}>
            <div id="filter-department">
              <p>Department</p>
              <hr />
              <section>
                {departments.map((department) => {
                  return (
                    <>
                      <input
                        type="checkbox"
                        className="btn-check"
                        name="options-departments"
                        id={department.toLowerCase()}
                        onChange={handleCheckboxChange("department")}
                      />
                      <label
                        className="btn btn-secondary"
                        htmlFor={department.toLowerCase()}
                      >
                        {department}
                      </label>
                    </>
                  );
                })}
              </section>
            </div>
            <div id="filter-title">
              <p>Title</p>
              <hr />
              <section>
                {titles.map((title) => {
                  return (
                    <>
                      <input
                        type="checkbox"
                        className="btn-check"
                        name="options-titles"
                        id={title.toLowerCase()}
                        onChange={handleCheckboxChange("title")}
                      />
                      <label
                        className="btn btn-secondary"
                        htmlFor={title.toLowerCase()}
                      >
                        {title}
                      </label>
                    </>
                  );
                })}
              </section>
            </div>
            <div id="filter-office">
              <p>Office</p>
              <hr />
              <section>
                {offices.map((office) => {
                  return (
                    <>
                      <input
                        type="checkbox"
                        className="btn-check"
                        name="options-offices"
                        id={office.toLowerCase()}
                        onChange={handleCheckboxChange("office")}
                      />
                      <label
                        className="btn btn-secondary"
                        htmlFor={office.toLowerCase()}
                      >
                        {office}
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
          <Button variant="primary" onClick={handleSubmit}>
            FILTER
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FilterPeople;
