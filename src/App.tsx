import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { OhmsLaw } from './components/pages/OhmsLaw';
import { OhmsLawSim } from './components/pages/OhmsLawSim';
import Tracker from './components/pages/Tracker';

export function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tracker' element={<Tracker />} />
          <Route path='/ohms-law' element={<OhmsLaw />} />
          <Route path='/simulation/ohms-law' element={<OhmsLawSim />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
