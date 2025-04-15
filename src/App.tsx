import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Navbar from './components/NavBar.tsx';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer.tsx';

const EndangeredSpecies = React.lazy(() => import("endangeredSpecies/EndangeredSpecies"));

function App() {
  return (
    <Router>
      <Flex direction="column" minH="100vh">
        <Navbar />
        <Box flex="1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/endangered-species"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <EndangeredSpecies />
                </Suspense>
              }
            />
          </Routes>
        </Box>
        <Footer />
      </Flex>
    </Router>
  );
}

export default App;

