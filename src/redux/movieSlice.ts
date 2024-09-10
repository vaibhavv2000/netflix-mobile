import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {movie} from "../utils/types";

interface state {
 movies: movie[];
 position: {
  x: number;
  y: number;
 };
 isHovered: boolean;
 hoveredMovie: movie | null;
};

const initialState: state = {
 movies: [],
 isHovered: false,
 position: {x: 0, y: 0},
 hoveredMovie: null,
};

export const movieSlice = createSlice({
 name: "movie",
 initialState,
 reducers: {
  addMovies: (state, {payload}: PayloadAction<movie[]>) => {
   state.movies = payload;
  },
  movieHovered: (state, {payload}: PayloadAction<{x: number; y: number; movie: movie}>) => {
   const {x, y, movie} = payload;

   state.isHovered = true;
   state.position = {x, y};
   state.hoveredMovie = movie;
  },
  movieUnhovered: (state) => {
   state.isHovered = false;
   state.hoveredMovie = null;
  }
 },
});

export const {addMovies, movieHovered, movieUnhovered} = movieSlice.actions;

export default movieSlice.reducer;