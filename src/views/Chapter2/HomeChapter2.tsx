import React from "react";
import {Link, Route, Routes,Router} from "react-router-dom";

const Home:React.FC =()=>{
    return(
        <div>
           <h1>Chapter2:Linear Algebra</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="Cramer's_Rule">Cramer's_Rule</Link>{" "}
                        <Link to="Gauss_Elimination">Gauss_Elimination</Link>{" "}
                        <Link to="GaussJordan">GaussJordan</Link>{" "}
                        <Link to="LU_Decomposition">LU_Decomposition</Link>{" "}
                        <Link to="Jacobi_Iteration">Jacobi_Iteration</Link>{" "}
                        <Link to="Gauss_Seidal">Gauss_Seidal</Link>{" "}
                        <Link to="Conjugate">Conjugate</Link>{" "}
                    </li>
                </ul>
            </nav>
        </div>

    )
}
export default Home