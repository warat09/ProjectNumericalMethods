import React from "react";
import {Link, Route, Routes,Router} from "react-router-dom";
import Chapter1 from "./Mainchapter1"

const Home:React.FC =()=>{
    return(
        <div>
           <h1>Chapter1:Root of eqution</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="BisectionMethod">BisectionMethod</Link>{" "}
                        <Link to="FalsePosition">FalsePosition</Link>{" "}
                        <Link to="OnePointInteration">OnePointInteration</Link>{" "}
                        <Link to="NewtonRaphson">NewtonRaphson</Link>{" "}
                    </li>
                </ul>
            </nav>
        </div>

    )
}
export default Home