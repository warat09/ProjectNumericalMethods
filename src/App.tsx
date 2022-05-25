import React,{useState } from 'react';
import { Transition,Menu } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/solid'


import './App.css';
import {HashRouter as Router, Route, Routes,Link,NavLink} from "react-router-dom";

import Chapter1 from './views/Chapter1';
import Chapter2 from './views/Chapter2';
import Chapter3 from './views/Chapter3';
import Chapter4 from './views/Chapter4';
import Chapter5 from './views/Chapter5';

import Home from './views/Dashboard/Home';
import Document from './views/Dashboard/Document';
import Project from './views/Dashboard/Project';
import About from './views/Dashboard/about';
import Nav from './views/Dashboard/Navbar';



const App: React.FC = () => {
  return (
    <div>
          <Router>
      <Nav/>
        <Routes>
                <Route path="/" element={<Home />} />
                <Route path="Document" element={<Document/>}/>
                <Route path="Numericalmethod" element={<Project/>}/>
                <Route path="About" element={<About/>}/>
            //Route chapter1
                <Route path="Numericalmethod/Rootofeqution" element={<Chapter1 />}/>
            //Route chapter2
                <Route path="Numericalmethod/LinearAlgebra" element={<Chapter2 />}/>
          //Route chapter3
                <Route path="Numericalmethod/InterpolationAndExtrapolation" element={<Chapter3 />}/>
          //Route chapter4
                <Route path="Numericalmethod/Least-Squares-Regression" element={<Chapter4 />}/>
          //Route chapter5
                <Route path="Numericalmethod/IntegrationAndDiffrentiation" element={<Chapter5 />}/>
        </Routes>
</Router>
    </div>

    // <div>

    // </div>
  );
};

export default App;
