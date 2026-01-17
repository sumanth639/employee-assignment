
const express=require("express")
const router=express.Router()

const {createReview,getReviews,assignReview,getAssignedReviews, deleteReviews, updateReviews}=require("../controllers/reviewController")

router.post("/",createReview)
router.get("/",getReviews)
router.post("/assign",assignReview)
router.get("/assign/:employeeId",getAssignedReviews)
router.delete("/:id",deleteReviews)
router.put("/:id",updateReviews)




module.exports=router;