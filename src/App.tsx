import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Navbar from './components/NavBar.tsx';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer.tsx';
import { LifeLensSpinner } from './components/LifeLensSpinner.tsx';

const EndangeredSpeciesDashboard = React.lazy(() => import("endangeredSpecies/Dashboard"));
const SpeciesCatalogue = React.lazy(() => import("speciesCatalogue/SpeciesCatalogue"));

function App() {
  return (
    <Router>
      <Flex direction="column" minH="100vh">
        <Box position="fixed" top="0" left="0" right="0" zIndex="1000">
          <Navbar />
        </Box>
        <Box flex="1" mt="50px" mb="85px" p={4}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/endangered-species"
              element={
                <Suspense fallback={<LifeLensSpinner />}>
                  <EndangeredSpeciesDashboard />
                </Suspense>
              }
            />
            <Route
              path="/species-catalogue"
              element={
                <Suspense fallback={<LifeLensSpinner />}>
                  <SpeciesCatalogue />
                </Suspense>
              }
            />
          </Routes>
        </Box>
        <Box position="fixed" bottom="0" left="0" right="0" zIndex="1000">
          <Footer />
        </Box>
      </Flex>
    </Router>
  );
}

export default App;

