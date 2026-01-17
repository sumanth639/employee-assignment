import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Employee from "./pages/Employee"
import Feedback from "./pages/Feedback"



function App() {
  

  return (
   <BrowserRouter>
   
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/employee" element={<Employee />} />
    <Route path="/feedback/:reviewId/:employeeId" element={<Feedback />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
