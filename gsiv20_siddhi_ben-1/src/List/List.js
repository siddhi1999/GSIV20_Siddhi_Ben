import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import "./List.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieList } from "../reducers/Slices/Movie/movieSlice";
import { searchMovie } from "../reducers/Slices/Movie/movieSlice";
import noMovie from "../assets/noMovie.png";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import noResults from "../assets/noResults.png";
const List = () => {
	const dispatch = useDispatch();
	const movieList = useSelector((state) => state.movie.movieList);
	const { status, searchVal } = movieList || {};
	const { total_pages, results } = movieList.data || {};
	const [page, setPage] = useState(1);
	useEffect(() => {
		if (searchVal) {
			console.log("search");
			dispatch(searchMovie({ page: page, searchValue: searchVal }));
		} else dispatch(fetchMovieList(page));
	}, [page]);

	return (
		<div>
			<div
				className="movie-card-wrapper"
				style={{ justifyContent: "flex-start" }}
			>
				{results.length ? (
					results.map((data, index) => {
						return (
							<Link
								to={"/Details/" + data.id}
								style={{ textDecoration: "none" }}
								key={index}
							>
								<Card sx={{ width: 210, height: 260 }}>
									<CardActionArea>
										<CardMedia
											component="img"
											height="100em"
											image={
												data.poster_path
													? `https://www.themoviedb.org/t/p/w150_and_h150_face${data.poster_path}`
													: noMovie
											}
										/>
										<CardContent>
											<Typography
												gutterBottom
												variant="h6"
												component="div"
												style={{
													display: "flex",
													justifyContent: "space-between",
												}}
											>
												<div>{data.title}</div>
												<div style={{ textAlign: "left" }}>
													({data.vote_average}/10)
												</div>
											</Typography>
											<Typography variant="body2" color="text.secondary">
												{data.overview.length > 40
													? data.overview.substring(0, 37)
													: data.overview}
												...
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Link>
						);
					})
				) : status === "loading" ? (
					<Box sx={{ display: "flex" }}>
						<CircularProgress />
					</Box>
				) : (
					<img
						style={{ marginLeft: "auto", marginRight: "auto" }}
						src={noResults}
					/>
				)}
				;
			</div>

			<hr
				style={{
					color: "#DFDFDF",
					height: 1,
				}}
			/>

			{total_pages && total_pages !== page ? (
				<Button
					variant="contained"
					disableElevation
					onClick={() => setPage(page + 1)}
					fullWidth
				>
					{status === "loading" ? "Loading..." : "Load More"}
				</Button>
			) : (
				""
			)}
		</div>
	);
};
export default List;
