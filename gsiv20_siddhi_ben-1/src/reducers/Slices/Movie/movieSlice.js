import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import env from "../../../secret.json";
import axios from "axios";

export const fetchMovieList = createAsyncThunk(
  "fetchMovieList",
  async (page) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?adult=false&api_key=${env.key}&page=${page}`
      );
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const searchMovie = createAsyncThunk(
  "searchMovie",
  async ({ page, searchValue }) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?adult=false&api_key=${env.key}&language=en-US&page=${page}&query=${searchValue}`
      );
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

const movieInitialState = {
  status: "idle",
  data: { results: [] },
  error: {},
  searchVal: "",
};
export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movieList: movieInitialState,
  },

  extraReducers: {
    //fetch movie
    [fetchMovieList.pending.type]: (state, action) => {
      console.log("ac", action);
      state.movieList.status = "loading";
      if (action.meta.arg === 1) state.movieList.data.results = [];
    },
    [fetchMovieList.fulfilled.type]: (state, action) => {
      state.movieList.status = "loaded";
      state.movieList.data = {
        results: [...state.movieList.data.results, ...action.payload.results],
        total_pages: action.payload.total_pages,
      };
    },
    [fetchMovieList.rejected.type]: (state, action) => {
      state.movieList.error = action.payload;
    },
    //searchMovie
    [searchMovie.pending.type]: (state, action) => {
      state.movieList.status = "loading";
      if (action.meta.arg.page === 1) {
        state.movieList.data.results = [];
        state.movieList.data.total_pages = null;
      }
    },
    [searchMovie.fulfilled.type]: (state, action) => {
      state.movieList.searchVal = action.meta.arg.searchValue;
      state.movieList.data = {
        results: action.meta.arg.page>1?[...state.movieList.data.results, ...action.payload.results]:action.payload.results,
        //results: action.payload.results,
        total_pages: action.payload.total_pages,
      };
      state.movieList.status = "loaded";
    },
    [searchMovie.rejected.type]: (state, action) => {
      state.movieList.error = action.payload;
    },
  },
});

export default movieSlice.reducer;
