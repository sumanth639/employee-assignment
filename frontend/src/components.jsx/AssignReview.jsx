import React, { useState } from 'react'

 function AssignReview() {
  const [employeeId, setEmployeeId] = useState("")
  const [reviewId, setReviewId] = useState("")


  // Handleing assigning new reviews
  const handleAssignReview = async () => {
    if (!employeeId || !reviewId) return

    try {
      const response = await fetch("http://localhost:8000/api/reviews/assign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId, reviewId }),
      })

      if (response.ok) {
        setEmployeeId("")
        setReviewId("")
        alert("Review assigned")
      }
    } catch (error) {
      console.error("Error:", error.message)
    }
  }

  return (
    <div>
      <h3>Assign Review</h3>
      <input
        type="text"
        placeholder="Enter reviewer employeeID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter reviewID see review list"
        value={reviewId}
        onChange={(e) => setReviewId(e.target.value)}
      />
      <button onClick={handleAssignReview}>Assign Review</button>
    </div>
  )
}

export default AssignReview