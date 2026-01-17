import React, { useEffect, useState } from "react";

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [editId, setEditId] = useState("");
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newEmployeeId, setNewEmployeeId] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/reviews");
        const result = await response.json();
        if (response.ok) {
          setReviews(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching reviews", error.message);
      }
    };
    fetchReviews();
  }, []);
  
//   Handles deleteing of reviews
  const handleDelete = async (id) => {
    if (!id) return;
    try {
      const response = await fetch(`http://localhost:8000/api/reviews/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setReviews((prev) => prev.filter((rev) => rev.id !== id));
      }
    } catch (error) {
      console.error("Error deleting review", error.message);
    }
  };
//  HAndles updating review
  const handleUpdate = async () => {
    if (!editId) return;
    try {
      const res = await fetch(`http://localhost:8000/api/reviews/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title: newTitle, 
          employeeId: newEmployeeId 
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setReviews((prev) =>
          prev.map((rev) => (rev.id === editId ? updated.data : rev))
        );
        setEditId("");
        setNewTitle("");
        setNewEmployeeId("");
        setEdit(false);
      }
    } catch (err) {
      console.error("Update failed");
    }
  };

   
//   Automatically sets the review title and employeeid
  const startEdit = (review) => {
    setEdit(true);
    setEditId(review.id);
    setNewTitle(review.title);
    setNewEmployeeId(review.employeeId);
  };

  return (
    <div>
      <h3>All Performance Reviews</h3>

      {edit && (
        <div >
          <h4>Update Review Details</h4>
          <input
            placeholder="Review Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            placeholder="Assigned Employee ID"
            value={newEmployeeId}
            onChange={(e) => setNewEmployeeId(e.target.value)}
          />
          <div >
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setEdit(false)} >Cancel</button>
          </div>
        </div>
      )}

      {reviews.length > 0 ? (
        <div>
          {reviews.map((review) => (
            <div key={review.id} className="card" >
              <p><strong>Title:</strong> {review.title}</p>
              <p><strong>Review ID:</strong> {review.id}</p>
              <p><strong>Subject Employee ID:</strong> {review.employeeId}</p>

              <div >
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(review.id)}
                  
                >
                  Delete
                </button>
                <button
                  className="edit-btn"
                  onClick={() => startEdit(review)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
}

export default ReviewList;