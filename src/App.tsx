import React,{useState } from 'react';
import { Transition,Menu } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/solid'


import './App.css';
import {HashRouter as Router, Route, Routes,Link,NavLink} from "react-router-dom";

import Chapter1 from './views/Chapter1';
import Chapter2 from './views/Chapter2';

import Mainchapter1 from "./views/Chapter1/Mainchapter1";
import Mainchapter2 from './views/Chapter2/Mainchapter2';

import Home from './views/Dashboard/Home';
import Document from './views/Dashboard/Document';
import Project from './views/Dashboard/Project';
import About from './views/Dashboard/about';
import Nav from './views/Dashboard/Navbar';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
                <Route path="/" element={<Home />} />
                <Route path="Document" element={<Document/>}/>
                <Route path="Numericalmethod" element={<Project/>}/>
                <Route path="About" element={<About/>}/>
            //Route chapter1
                <Route path="Numericalmethod/Rootofeqution" element={<Chapter1 />}/>
                <Route path="Numericalmethod/Rootofeqution/BisectionMethod" element={<Mainchapter1 name={"Bisection"}/>}/>
                <Route path="Numericalmethod/Rootofeqution/FalsePosition" element={<Mainchapter1 name={"FalsePosition"}/>}/>
                <Route path="Numericalmethod/Rootofeqution/OnePointInteration" element={<Mainchapter1 name={"OnePointInteration"}/>}/>
                <Route path="Numericalmethod/Rootofeqution/NewtonRaphson" element={<Mainchapter1 name={"NewtonRaphson"}/>}/>
            //Route chapter1
                <Route path="Numericalmethod/LinearAlgebra" element={<Chapter2 />}/>
                <Route path="Numericalmethod/LinearAlgebra/Cramer's_Rule" element={<Mainchapter2 name={"Cramer's_Rule"}/>}/>
                <Route path="Numericalmethod/LinearAlgebra/Gauss_Elimination" element={<Mainchapter2 name={"Gauss_Elimination"}/>}/>
                <Route path="Numericalmethod/LinearAlgebra/GaussJordan" element={<Mainchapter2 name={"GaussJordan"}/>}/>
                <Route path="Numericalmethod/LinearAlgebra/LU_Decomposition" element={<Mainchapter2 name={"LU_Decomposition"}/>}/>
                <Route path="Numericalmethod/LinearAlgebra/Jacobi_Iteration" element={<Mainchapter2 name={"Jacobi_Iteration"}/>}/>
                <Route path="Numericalmethod/LinearAlgebra/Gauss_Seidal" element={<Mainchapter2 name={"Gauss_Seidal"}/>}/>
                <Route path="Numericalmethod/LinearAlgebra/Conjugate" element={<Mainchapter2 name={"Conjugate"}/>}/>
        </Routes>
    </div>
</Router>
    // <div>

    // </div>
  );
};

export default App;
