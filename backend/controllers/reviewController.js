
const {reviews,assignments,employees}=require("../data/store")


// Create a new Review
const createReview=async(req,res)=>{

    const {employeeId,title}=req.body;

    if(!employeeId || !title){
        return res.status(404).json({
            message:"employeeId and title are required"
        })
    }


    const newReview={
        id:Date.now().toString(),
        employeeId,
        title
    }

    reviews.push(newReview)

    res.status(200).json({
        message:" Review created successfully",
        data:newReview
    })
}


const getReviews=async(req,res)=>{

    res.status(200).json({
        message:"Reviews fetched successfully",
        data:reviews
    })
}


// Assing a review to a employee
const assignReview = async (req, res) => {
    const { employeeId, reviewId } = req.body;

    if(!employeeId || !reviewId){
        return res.status(404).json({
            message:"employeeId and reviewId are required"
        })
    }

    if (!employeeId || !reviewId) {
        return res.status(404).json({
            message: "employeeId and reviewId are required"
        });
    }

    const reviewer = employees.find(emp => emp.id === employeeId);
    const review = reviews.find(rev => rev.id === reviewId);

    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    const subject = employees.find(emp => emp.id === review.employeeId);

    const newAssignment = {
        id: Date.now().toString(),
        employeeId, 
        reviewId,
        reviewerName: reviewer?.name,
        subjectName: subject?.name,
        employee: reviewer,
        review: review
    };

    assignments.push(newAssignment);

    res.status(200).json({
        message: "Review assigned successfully",
        data: newAssignment
    });
};  


// Get all assigned reviews
const getAssignedReviews=async(req,res)=>{

    const employeeId=req.params.employeeId;

    if(!employeeId){
        return res.status(404).json({
            message:"employeeId is required"
        })
    }

    const assignmentsForEmployee=assignments.filter(assignment=>assignment.employeeId===employeeId)


    res.status(200).json({
        message:"Assigned reviews got successfully",
        data:assignmentsForEmployee
    })
}

const updateReviews=async(req,res)=>{
    const {id}=req.params;
    const {title,employeeId}=req.body;

    if(!id || !title){
        return res.status(404).json({
            message:"id and title are required"
        })
    }

    const review=reviews.find(review=>review.id===id)

    if(!review){
        return res.status(404).json({
            message:"Review not found"
        })
    }

    review.title = title || review.title;
    review.employeeId = employeeId || review.employeeId;

    res.status(200).json({
        message:"Review updated successfully",
        data:review
    })
}

const deleteReviews=async(req,res)=>{
    const {id}=req.params;

    if(!id){
        return res.status(404).json({
            message:"id is required"
        })
    }
    const review=reviews.find(review=>review.id===id)

    if(!review){
        return res.status(404).json({
            message:"Review not found"
        })
    
    }

    reviews.splice(reviews.indexOf(review), 1)


    return res.status(200).json({
        message:"Review deleted successfully",
        data:review
    })

}


module.exports={createReview,getReviews,assignReview,getAssignedReviews,updateReviews,deleteReviews}