import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../redux/userSlice';
import movieSlice from '../redux/movieSlice';

const store = configureStore({
 reducer: {
  user: userSlice,
  movie: movieSlice,
 },
 devTools: false,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;