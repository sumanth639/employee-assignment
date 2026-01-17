const express=require("express")
const router=express.Router()

const {createFeedback,getAllFeedbacks}=require("../controllers/feedbackController")


router.post("/",createFeedback)
router.get("/",getAllFeedbacks)



module.exports=router;