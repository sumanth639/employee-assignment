import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Employee() {
  const [employeeId, setEmployeeId] = useState("");
  const [assignedReviews, setAssignedReviews] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  
  // Fetchs all the reviws with the id 
  const fetchMyReviews = async () => {
    if (!employeeId) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/reviews/assign/${employeeId}`
      );
      const result = await response.json();

      if (response.ok) {
        setAssignedReviews(result.data || []);
        setHasSearched(true);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
    }
  };

  return (
    <div className="page-container">
      <h1>Employee Portal</h1>

      <div>
        <input
          type="text"
          placeholder="Enter your employeeID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <button onClick={fetchMyReviews}>Get reviews</button>
      </div>

      {hasSearched && (
        <div>
          <h3>Reviews pending for feedback</h3>
          {assignedReviews.length > 0 ? (
            <ol>
              {assignedReviews.map((assignment) => (
                <li key={assignment.id}>
                  <p>
                    <strong>Review Topic:</strong> {assignment.review?.title}
                  </p>
                  <p>
                    <strong>Review For:</strong> {assignment.subjectName}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/feedback/${assignment.reviewId}/${employeeId}`)
                    }
                  >
                    Give Feedback
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p>No reviews assigned</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Employee;
