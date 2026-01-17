import React, { useState } from "react";

function EmployeeList({ employees, fetchEmployees }) {
  const [editId, setEditId] = useState("");
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  
  // Handles delete of emplyee
  const handleDelete = async (id) => {
    if (!id) return;
    try {
      const response = await fetch(`http://localhost:8000/api/employees/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchEmployees();
      }
    } catch (error) {
      console.error("Error deleting employees", error.message);
    }
  };
  // Handles updating of employee
  const handleUpdate = async () => {
    if (!editId || !newName || !newEmail) return;
    try {
      const res = await fetch(`http://localhost:8000/api/employees/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, email: newEmail }),
      });
      if (res.ok) {
        setEditId("");
        setNewName("");
        setNewEmail("");
        setEdit(false);
        fetchEmployees();
      }
    } catch (err) {
      console.error("Update failed");
    }
  };

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
        <div >
          <h4>Update Employee</h4>
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
          <div >
            <button onClick={handleUpdate}>Save Changes</button>
            <button onClick={() => setEdit(false)} >Cancel</button>
          </div>
        </div>
      )}

      {employees && employees.length > 0 ? (
        <ol>
          {employees.map((employee) => (
            <li key={employee.id} className="card" >
              <div>
                <strong>Name:</strong> {employee.name} <br />
                <strong>Email:</strong> {employee.email} <br />
                <strong>ID:</strong> {employee.id}
              </div>
              <div >
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