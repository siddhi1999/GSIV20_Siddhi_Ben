import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import NoPage from './404';
import Details from './Details/Details';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Layout />}>
        <Route path="*" element={<NoPage />} />
        </Route>
        <Route path= "/Details/:id" element= {<Details />} />
      </Routes>
    </BrowserRouter>  );
}

export default App;
