import { Suspense } from 'react';
import React from 'react';
import './App.css';


const RemoteSpecies = React.lazy(() => import("endangeredSpecies/EndangeredSpecies"));


function App() {

  return (
    <>
      <h1>LifeLens</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteSpecies/>
      </Suspense>
    </>
  )
}

export default App
