import React, { useState, useEffect } from "react";
import "./ListDisplayPeople.css";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DeletePerson from "../DeletePerson/DeletePerson";

function ListDisplayPeople() {
  const [data, setData] = useState([]);
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const filteredUsers = location.state?.data;

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("https://be.boxitbro.mohamedradwan.me/api/all-users");
      const result = await response.json();
      if (result.users && Array.isArray(result.users)) {
        setData(result.users);
      } else {
        console.error("Invalid data format:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (
      filteredUsers &&
      Array.isArray(filteredUsers) &&
      filteredUsers.length > 0
    ) {
      setData(filteredUsers);
    } else {
      fetchAllUsers();
    }
  }, [filteredUsers]);

  console.log(data);

  const handleDelete = (id) => {
    setSelectedPersonId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div id="display-table">
      <div id="filter-group">
        <Link to="filter">
          <img src="filter.svg" alt="Filter" width={30} />
        </Link>
        <Button onClick={fetchAllUsers}>Display All Users</Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Delete</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Title</th>
            <th>Computer</th>
            <th>Office</th>
            <th>Hire Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee, index) => (
            <tr key={index}>
              <button
                onClick={() => handleDelete(employee.id)}
                id="delete-icon"
              >
                <img src="bin.svg" alt="Delete" width={25} />
              </button>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.title}</td>
              <td>{employee.computer}</td>
              <td>{employee.office}</td>
              <td>{employee.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <DeletePerson
          personId={selectedPersonId}
          onSuccess={fetchAllUsers}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default ListDisplayPeople;
