import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { OhmsLawLesson, OhmsLawVisual } from './components/pages/OhmsLaw';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='ohms-law' element={<Outlet />}>
          <Route index element={<OhmsLawLesson />} />
          <Route path='3d' element={<OhmsLawVisual />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
