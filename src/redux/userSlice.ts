import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {user} from "../utils/types";

const user = {name: "", email: "", id: -1, wishlist: []};

const initialState: {user: user} = {user};

export const userSlice = createSlice({
 name: "user",
 initialState,
 reducers: {
  login: (state, {payload}: PayloadAction<user>) => { 
   let wishlist = payload?.wishlist || []; 
   state.user = {...payload, wishlist};
  },
  updateWishlist: (state, {payload}: PayloadAction<{id: number, add?: boolean}>) => {
   const {id, add} = payload;
   
   if(add && !state.user.wishlist.includes(id)) state.user.wishlist = [...state.user.wishlist, id];
   else state.user.wishlist = state.user.wishlist.filter(item => item !== id);
  },
  logout: (state) => {
   state.user = user;
  }
 },
});

export const {login,logout,updateWishlist} = userSlice.actions;

export default userSlice.reducer;