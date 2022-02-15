import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import NoPage from './404';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>  );
}

export default App;
