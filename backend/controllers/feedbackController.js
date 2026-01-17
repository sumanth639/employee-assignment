const {feedbacks} =require("../data/store")

// create a new feedback
const createFeedback=async(req,res)=>{
    const {employeeId,reviewId,comment}=req.body;

    if(!employeeId || !reviewId || !comment){
        return res.status(404).json({
            message:"employeeId,reviewId and comment are required"
        })
    }

    const newFeedback={
        id:Date.now().toString(),
        employeeId,
        reviewId,
        comment
    }

    feedbacks.push(newFeedback)

    res.status(200).json({
        message:"Feedback submitted successfully",
        data:newFeedback
    })


}
// Get all feedback
const getAllFeedbacks=async(req,res)=>{ 

    
    res.status(200).json({
        message:"Feedback fetched successfully",
        data:feedbacks
    })
}



module.exports={createFeedback,getAllFeedbacks}
