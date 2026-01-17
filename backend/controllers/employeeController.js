const { employees } = require("../data/store");

// Create a new employee

const createEmployee = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(404).json({
      message: "Name and email are required",
    });
  }

  const newEmployee = {
    id: Date.now().toString(),
    name,
    email,
  };

  employees.push(newEmployee);

  res.status(200).json({
    message: "New employee created successfully",
    data: newEmployee,
  });
};

// Get all employees
const getEmployees = async (req, res) => {
  res.status(200).json({
    message: "Employee fetched successfully",
    data: employees,
  });
};

// Update employees

const updateEmploee = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if(!name || !email || !id){
    return  res.json({
      message:"Name,email and id are required"
    })
  }

  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return res.status(404).json({
      message: "Employee not found",
    });
  }

  employee.name = name || employee.name;
  employee.email = email || employee.email;

  res.status(200).json({
    message: "Employee updated successfully",
    data: employee,
  });
};

// Delete employee

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

    if(!id){
    return  res.json({
      message:"Name,email and id are required"
    })
  }

  const employee = employees.find((employee) => employee.id === id);

  if (!employee) {
    return res.status(404).json({
      message: "Employee not found",
    });
  }

  employees.splice(employees.indexOf(employee), 1);

  res.status(200).json({
    message: "Employee deleted successfully",
    data: employee,
  });
};

module.exports = {
  createEmployee,
  getEmployees,
  updateEmploee,
  deleteEmployee,
};
