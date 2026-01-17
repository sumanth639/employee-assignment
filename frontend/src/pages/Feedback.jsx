import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Feedback() {
  const { reviewId, employeeId } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  // Handles Feedback Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment) return;

    try {
      const response = await fetch("http://localhost:8000/api/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewId,
          employeeId,
          comment,
        }),
      });

      if (response.ok) {
        setComment("");
        setSubmitted(true);
        alert("Feedback submitted successfully");
      }
    } catch (error) {
      console.error("Error submitting feedback", error.message);
    }
  };

  return (
    <div className="page-container">
      <h2>Submit Feedback</h2>

      {submitted ? (
        <div>
          <p>Thank you yoru feedback has been submitted</p>
          <button onClick={() => navigate("/employee")}>Back to Portal</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Your Comments:</label>
            <br />
            <textarea
              rows="5"
              cols="40"
              placeholder="Write your feedback here"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
}

export default Feedback;
