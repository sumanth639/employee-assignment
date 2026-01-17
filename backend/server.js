const express=require("express")
const cors=require("cors")


const employeeRoutes =require("./routes/employeeRoutes")
const reviewRoutes =require("./routes/reviewRoutes")
const feedbackRoutes =require("./routes/feedbackRoutes")

const app=express()


// Middleware

app.use(cors())
app.use(express.json())


// Routes


app.use("/api/employees",employeeRoutes)
app.use("/api/reviews",reviewRoutes)
app.use("/api/feedbacks",feedbackRoutes)



const PORT=8000

app.listen(PORT,()=>{
    console.log(`server runing on port ${PORT}`)
})