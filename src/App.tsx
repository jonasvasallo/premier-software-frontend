
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';

function App() {
  return (
    <div className='w-full md:w-[1024px] m-auto flex h-[100vh]'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* index route renders at "/" */}
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="sales" element={<Sales />} />
          {/* 404 fallback */}
          <Route path="*" element={<div>Not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

