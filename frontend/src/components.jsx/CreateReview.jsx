import React, { useState } from "react";

function CreateReview() {
  const [employeeId, setEmployeeId] = useState("");
  const [title, setTitle] = useState("");


  // Handles creating new review
  const handleCreateReview = async () => {
    if (!employeeId || !title) return;

    try {
      const response = await fetch("http://localhost:8000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId, title }),
      });

      if (response.ok) {
        setEmployeeId("");
        setTitle("");
        alert("Review created");
      }
    } catch (error) {
      console.error("Error connecting to server:", error.message);
    }
  };

  return (
    <div>
      <h3>Create a Review for Employee</h3>
      <input
        type="text"
        placeholder="Enter employeeId refer employee list"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter review title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleCreateReview}>Create Review</button>
    </div>
  );
}

export default CreateReview;

