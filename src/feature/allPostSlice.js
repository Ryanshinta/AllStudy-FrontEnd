import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    allPost: null,
};



export const getAllPost = createAsyncThunk(
    "localhost:8765/api/getAllPost",
    async() =>{
        const response = await axios({
            method: "GET",
            url:"localhost:8765/api/getAllPost",
            headers:{
                Authorization:localStorage.getItem("Token"),
            },
        });

        console.log(response);
        return response.data.payload;
    }
)

export const allPostSlice = createSlice({
    name:"allPostSlice",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getAllPost.fulfilled,(state, action) =>{
            state.allPosts = action.payload;
        })
    }
})

export default allPostSlice.reducer;