import { Outlet, Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import List from './List/List';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <TextField 
                id="outlined-basic" 
                variant="outlined" 
                placeholder= "Search"
                 />
            <Link to="/">Home</Link>
          </li>
          <li>
            <List />
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;