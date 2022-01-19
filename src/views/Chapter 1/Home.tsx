import React from "react";
import {Link, Route, Routes,Router} from "react-router-dom";
import Bisection_method from "./Bisection_method";

const Home:React.FC =()=>{
    return(
        <div>
           <h1>Chapter1:Root of eqution</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="BisectionMethod">BisectionMethod</Link>{" "}
                    </li>
                </ul>
            </nav>
        </div>

    )
}
export default Home