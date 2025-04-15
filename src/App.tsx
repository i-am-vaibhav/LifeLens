import './App.css'
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import './index.css';

const EndangeredSpecies = React.lazy(() => import('endangeredSpecies/EndangeredSpecies'));

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About/>} />
          {/* Specific module routes */}
          <Route path="species-catalog" element={
              <Suspense fallback={<div className="p-4">Loading remote...</div>}>
                <p>Species Catalog</p>
              </Suspense>
            } />
          <Route path="microbial-strains" element={
              <Suspense fallback={<div className="p-4">Loading remote...</div>}>
                <p>Microbial Strains</p>
              </Suspense>
            }  />
          <Route path="endangered-species" element={
              <Suspense fallback={<div className="p-4">Loading remote...</div>}>
                <EndangeredSpecies />
              </Suspense>
            } />
        </Route>
      </Routes>
    </Router>
  );
}