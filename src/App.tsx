import React from 'react';
import './App.css';
import {HashRouter as Router, Route, Routes,Link} from "react-router-dom";

import Chapter1 from "./views/Chapter 1/Home";
import Bisection_method from "./views/Chapter 1/Bisection_method";

const App: React.FC = () => {
  return (

        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="Chapter1">บทที่1</Link>{" "}
                            <Link to="about">about</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                        <Route path="Chapter1" element={<Chapter1 />}/>
                        <Route path="Chapter1/BisectionMethod" element={<Bisection_method />}/>


                    {/*<Route path="about" element={}/>*/}
                </Routes>


            </div>
        </Router>

  );
};

export default App;
