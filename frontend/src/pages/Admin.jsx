import React, { useState } from "react";
import AddEmployee from "../components.jsx/AddEmployee";
import AssignReview from "../components.jsx/AssignReview";
import CreateReview from "../components.jsx/CreateReview";
import EmployeeList from "../components.jsx/EmployeeList";
import FeedbackList from "../components.jsx/FeedbackList";
import ReviewList from "../components.jsx/ReviewList";

function Admin() {
  const [activeTab, setActiveTab] = useState("employees");

  return (
    <div className="admin-layout">
      <h3>Welcome to Admin Dashboard</h3>

      <div className="admin-columns">
        <div className="admin-left">
          <AddEmployee />
          <CreateReview />
          <AssignReview />
        </div>

        <div className="admin-right">
          <div className="tab-buttons">
            <button
              className={activeTab === "employees" ? "active" : ""}
              onClick={() => setActiveTab("employees")}
            >
              Employees
            </button>

            <button
              className={activeTab === "reviews" ? "active" : ""}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>

            <button
              className={activeTab === "feedbacks" ? "active" : ""}
              onClick={() => setActiveTab("feedbacks")}
            >
              Feedback
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "employees" && <EmployeeList />}
            {activeTab === "reviews" && <ReviewList />}
            {activeTab === "feedbacks" && <FeedbackList />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
