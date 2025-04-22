import './App.css'
import SpeciesCatalogue from './components/SpeciesCatalogue.tsx'
import { Provider } from '../../../src/components/ui/provider.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <Provider>
      {/* <SpeciesCatalogue/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SpeciesCatalogue />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
