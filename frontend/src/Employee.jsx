import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Employee() {
  //displaying the data with useState
  const [data, setData] = useState([]);

  //fetching api with useEffect
  useEffect(() => {
    axios
      .get("http://localhost:8081/getEmployee")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  //deleting employee account
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/delete/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Employee List</h3>
      </div>
      <Link to="/create" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => {
              return (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>
                    {
                      <img
                        src={`http://localhost:8081/images/` + employee.image}
                        alt=""
                        className="employee_image"
                      />
                    }
                  </td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <Link
                      to={`/employeeEdit/` + employee.id}
                      className="btn btn-primary btn-sm me-2"
                    >
                      edit
                    </Link>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="btn btn-sm btn-danger"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
