import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./Slices/Movie/movieSlice";
export default configureStore({
  reducer: {
    movie: movieReducer,
  },
});
