import React, { useEffect, useState } from "react";
import env from '../secret.json';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import "./List.css";
const List = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${env.key}&page=${page}`,
    })
      .then((res) => {
        console.log("res", res);
        setTotalPages(res.data.total_pages);
        setMovieList([...movieList, ...res.data.results]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [page]);

  return (
    <div>
      <div className="movie-card-wrapper">
        {movieList.map((data, index) => {
          return (
            <Card key={index} sx={{ maxWidth: 250 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={`	https://www.themoviedb.org/t/p/w220_and_h330_face${data.poster_path}`}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.overview}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
        ;
      </div>

      {totalPages !== page ? (
        <Button
          variant="contained"
          disableElevation
          onClick={() => setPage(page + 1)}
          fullWidth
        >
          {loading ? "Loading..." : "Load More"}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};
export default List;
