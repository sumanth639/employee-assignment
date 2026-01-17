import React, { useState } from "react";

 function AddEmployee({ fetchEmployees }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  // HAndles adding new employee
  async function handleAddEmployee(e) {
    e.preventDefault();

    if (!name || !email) return;

    try {
      const response = await fetch("http://localhost:8000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        setName("");
        setEmail("");
        alert("New Employee added")
        fetchEmployees();
      } else {
        console.error("Failed to add employee");
      }
    } catch (error) {
      console.error("Error adding employee", error);
    }
  }

  return (
    <div>
      <h3>Add Employee</h3>
      <input
        type="text"
        placeholder="Enter employee name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter employee email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleAddEmployee}>Add Employee</button>
    </div>
  );
}

export default AddEmployee;