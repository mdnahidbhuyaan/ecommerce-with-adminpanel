/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
}

export const fetchAllFilteredProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async ({filterParams,sortParams}) => {
    console.log(fetchAllFilteredProducts, "fetchAllFilteredProducts");
    const query = new URLSearchParams({
      ...filterParams,
      sortBy:sortParams
    });
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`,
    );

    console.log(result, "result");
    return result?.data;
  },
);

const shoppingProductSlice = createSlice({
   name:"shoppingProduct",
   initialState,
   reducers:{},
   extraReducers:(builder)=>{
  builder
    .addCase(fetchAllFilteredProducts.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload.data
    })
    .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.productList = []
    });
    
   }
})

export default shoppingProductSlice.reducer