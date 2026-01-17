const express=require("express")
const {createEmployee,getEmployees, updateEmploee, deleteEmployee}=require("../controllers/employeeController") 


const router=express.Router()

router.post("/",createEmployee)
router.get("/",getEmployees)
router.put("/:id",updateEmploee)
router.delete("/:id",deleteEmployee)


module.exports=router;