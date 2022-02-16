import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import env from '../secret.json';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const Details = () => {
    const [ movieDetail, setMovieDetail ] = useState([]);
    const [genres_, setGenres] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios({
            method: "get",
            url: `https://api.themoviedb.org/3/movie/${id}?api_key=${env.key}`
        })
        .then(res => {
            console.log('res', res);
            setMovieDetail([ res.data ]);
            // console.log('genres', res.data.genres);
            setGenres([...res.data.genres]);
        });
    }, []);

    return (
        <div>
        {movieDetail.map((data, index) => {
            return(
                <Card sx={{ display: 'flex' }} key={index}>
                    <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={`https://www.themoviedb.org/t/p/w220_and_h330_face${data.poster_path}`}
                        alt="Live from space album cover"/>

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {data.original_title} ({data.vote_average})
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            {data.release_date.slice(0,4)} | {data.runtime} mins
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            Genres: {genres_.map(res => (res.name + ', '))}
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            Description: {data.overview}
                        </Typography>
                    </CardContent>
                    </Box>
                </Card>
            );
        })}
        </div>
    );
};

export default Details;