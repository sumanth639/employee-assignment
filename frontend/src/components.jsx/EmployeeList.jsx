import React, { useEffect, useState } from "react";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [editId, setEditId] = useState("");
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/employees");
        const result = await response.json();
        setEmployees(result.data || []);
      } catch (error) {
        console.log("Error fetching employees", error.message);
      }
    };

    fetchEmployees();
  }, []);
 
  // Handles delete of emplyee
  const handleDelete = async (id) => {
    if (!id) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/employees/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      }
    } catch (error) {
      console.error("Error deleting employee", error.message);
    }
  };
  //  Saves the updated for the backend 
  const handleUpdate = async () => {
    if (!editId || !newName || !newEmail) return;

    try {
      const res = await fetch(`http://localhost:8000/api/employees/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, email: newEmail }),
      });

      if (res.ok) {
        const updated = await res.json();
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === editId ? updated.data : emp))
        );
        setEditId("");
        setNewName("");
        setNewEmail("");
        setEdit(false);
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Update failed");
    }
  };
  
  // USed to update the emplyee and automatically sets the employee name email
  const startEdit = (employee) => {
    setEdit(true);
    setEditId(employee.id);
    setNewName(employee.name);
    setNewEmail(employee.email);
  };

  return (
    <div>
      <h3>All Employee List</h3>

      {edit && (
        <div>
          <h4>Update Employee</h4>
          <input
            placeholder="Employee ID"
            value={editId}
            onChange={(e) => setEditId(e.target.value)}
          />
          <input
            placeholder="New Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            placeholder="New Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEdit(false)} >Cancel</button>
        </div>
      )}

      {employees.length > 0 ? (
        <ol>
          {employees.map((employee) => (
            <li key={employee.id} className="card">
              <span>Name: {employee.name} </span>
              <span>Email: {employee.email} </span>
              <span>Employee ID: {employee.id}</span>

              <div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
                <button
                  className="edit-btn"
                  onClick={() => startEdit(employee)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p>No employees found</p>
      )}
    </div>
  );
}

export default EmployeeList;
