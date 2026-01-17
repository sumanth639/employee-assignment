import React, { useEffect, useState } from "react";

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/feedbacks");
      const result = await response.json();
      setFeedbacks(result.data || []);
    } catch (error) {
      console.error("Error fetching feedbacks:", error.message);
    }
  };

  return (
    <div>
      <h3>Submitted Feedback</h3>

      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet</p>
      ) : (
        <div>
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="card">
              <p>Review ID: {feedback.reviewId}</p>
              <p>From Employee ID: {feedback.employeeId}</p>
              <p>Comment: {feedback.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FeedbackList;
