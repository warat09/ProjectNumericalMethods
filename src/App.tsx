import React from 'react';
import './App.css';
import {HashRouter as Router, Route, Routes,Link} from "react-router-dom";

import Chapter1 from './views/Chapter1';
import Chapter2 from './views/Chapter2';

import Mainchapter1 from "./views/Chapter1/Mainchapter1";
import Mainchapter2 from './views/Chapter2/Mainchapter2';


const App: React.FC = () => {
  return (

        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="Rootofeqution">บทที่1</Link>{" "}
                            <Link to="LinearAlgebra">บทที่2</Link>{" "}
                            <Link to="about">about</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    //Route chapter1
                        <Route path="Rootofeqution" element={<Chapter1 />}/>
                        <Route path="Rootofeqution/BisectionMethod" element={<Mainchapter1 name={"Bisection"}/>}/>
                        <Route path="Rootofeqution/FalsePosition" element={<Mainchapter1 name={"FalsePosition"}/>}/>
                        <Route path="Rootofeqution/OnePointInteration" element={<Mainchapter1 name={"OnePointInteration"}/>}/>
                        <Route path="Rootofeqution/NewtonRaphson" element={<Mainchapter1 name={"NewtonRaphson"}/>}/>
                    //Route chapter1
                        <Route path="LinearAlgebra" element={<Chapter2 />}/>
                        <Route path="LinearAlgebra/Cramer's_Rule" element={<Mainchapter2 name={"Cramer's_Rule"}/>}/>
                        <Route path="LinearAlgebra/Gauss_Elimination" element={<Mainchapter2 name={"Gauss_Elimination"}/>}/>
                        <Route path="LinearAlgebra/GaussJordan" element={<Mainchapter2 name={"GaussJordan"}/>}/>
                        <Route path="LinearAlgebra/LU_Decomposition" element={<Mainchapter2 name={"LU_Decomposition"}/>}/>
                        <Route path="LinearAlgebra/Jacobi_Iteration" element={<Mainchapter2 name={"Jacobi_Iteration"}/>}/>
                        <Route path="LinearAlgebra/Gauss_Seidal" element={<Mainchapter2 name={"Gauss_Seidal"}/>}/>
                        <Route path="LinearAlgebra/Conjugate" element={<Mainchapter2 name={"Conjugate"}/>}/>


                </Routes>


            </div>
        </Router>

  );
};

export default App;
