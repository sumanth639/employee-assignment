import { useNavigate } from "react-router-dom"

function Home(){

    const navigate = useNavigate()


    return(
        <div className="page-container">

            <h2>Welcome to Feedback Managment Portal</h2>
            <button onClick={() => navigate("/admin")}>Admin</button>
            <button onClick={() => navigate("/employee")}>Employee</button>
        </div>
    )
}

export default Home