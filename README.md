# Employee Feedback App

## Assumptions

* No authentication system and employee can access the portal using there employee id 
* In order to store the data i used the memory for it 
* Only basic validation is implemented


## Features

### Admin
* Add delete and update employees and view employee list
* Can create new reviews and update and delete it and aslo see the review list   
* Assign reviews to employee using the employee ID 
* Can see all the feedbacks sent by the users 

### Employee
* Can see the reivews assigned to them using the employee id and can send the feedback  


## Tech Stack

* Backend: Node.js, Express
* Frontend: React, React Router
* Storage: In-memory arrays
* Styling: Plain CSS 



## Setup Instructions

### Backend

```bash
cd backend  
npm install  
npm run dev
```

Server runs in:  
http://localhost:5000


### Frontend

```bash
cd frontend  
npm install  
npm run dev
```

Frontend runs at:  
http://localhost:5173

## API Endpoints

### Employees
* POST /api/employees - To Create a new Employee 
* GET /api/employees  - To get all employees
* PUT /api/employees/:id  - To update the employee 
* DELETE /api/employees/:id  - Delete the current employee

### Reviews
* POST /api/reviews  - To create a new review
* GET /api/reviews   - To fetch all the reviews
* PUT /api/reviews/:id   - To update an review
* DELETE /api/reviews/:id   - To delete an particular review
* POST /api/reviews/assign  - To assign an reeview to an employee 
* GET /api/reviews/assigned/:employeeId  - To fetch all the reviews to an particlar employee 

### Feedback
* POST /api/feedback  - Used to send the feedback
* GET /api/feedback   - Used to fetch all the feedback for admin panel

---

## Flow

1. Admin can add an employee wiith thier name and emial
2. Then admin can create a new review for an employee using there id  
3. Next admin can assing this created review any other employee using reviewid and the employee id  
4. In the employee portal the employee can input there id and can see all the reivws assigned to them
5. Then using the Feedback button, employee can give feedback to that particular review 
6. Once the feedback is send the admin can see all the feedbacks in the admin portal

