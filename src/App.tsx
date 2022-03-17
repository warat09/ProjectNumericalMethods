import React from 'react';
import './App.css';
import {HashRouter as Router, Route, Routes,Link} from "react-router-dom";

import Chapter1 from './views/Chapter1';

import Mainchapter1 from "./views/Chapter1/Mainchapter1";


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
                        <Route path="Chapter1/BisectionMethod" element={<Mainchapter1 name={"Bisection"}/>}/>
                        <Route path="Chapter1/FalsePosition" element={<Mainchapter1 name={"FalsePosition"}/>}/>
                        <Route path="Chapter1/OnePointInteration" element={<Mainchapter1 name={"OnePointInteration"}/>}/>
                        <Route path="Chapter1/NewtonRaphson" element={<Mainchapter1 name={"NewtonRaphson"}/>}/>
                </Routes>


            </div>
        </Router>

  );
};

export default App;
