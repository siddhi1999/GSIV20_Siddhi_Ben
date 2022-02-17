import { useEffect } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import SvgIcon from "@mui/material/SvgIcon";
import List from "./List/List";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchMovie } from "./reducers/Slices/Movie/movieSlice";
import { fetchMovieList } from "./reducers/Slices/Movie/movieSlice";
const Layout = () => {
	const [searchInput, setSearchInput] = useState("");
	const dispatch = useDispatch();
	const location = useLocation();

	const handleClick = (e) => {
		const searchValue = e.target.value;
		setSearchInput(searchValue);
		if (searchValue)
			dispatch(searchMovie({ page: 1, searchValue: searchValue }));
		else dispatch(fetchMovieList(1));
	};

	return (
		<>
			<nav>
				<ul style={{ listStyle: "none" }}>
					<li style={{ display: "flex", "justify-content": "space-between" }}>
						{location.pathname === "/" ?
							<TextField
								id="outlined-basic"
								variant="filled"
								placeholder="Search"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<SearchIcon />
										</InputAdornment>
									),
								}}
								size="small"
								onChange={handleClick}
								value={searchInput}
								style={{ width: "60%" }}
							/>
							:
							<p>Movie Details </p>
						}

						<Link to="/" style={{ textDecoration: "none" }}>
							<HomeIcon fontSize="large" color= "black" />
						</Link>
					</li>
				</ul>
			</nav>

			<Outlet />
		</>
	);
};

export default Layout;
