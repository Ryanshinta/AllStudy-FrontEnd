import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    followingPosts: null,
};


export const getFollowingPosts = createAsyncThunk(
    "http://localhost:8765/api/followingPosts",
    async () =>{
        const response = await axios({
            method: "post",
            url: "http://localhost:8765/api/followingPosts",
            headers:{
                Authorization:localStorage.getItem("Token"),
            },
            data:{
                id: localStorage.getItem("UserID"),
            },
        });
        return response.data.payload;
    }
);

async function insertComment(postId, commentContent) {
    const response = await axios({
        method: "post",
        url: "http://localhost:8765/api/insertComment",
        headers: {
            Authorization: localStorage.getItem("Token"),
        },
        data: {
            commentEntity: {
                userId: localStorage.getItem("UserId"),
                UserName: localStorage.getItem("UserName"),
                content: commentContent,
            },
            postId: {
                id: postId,
            },
        },
    });
}

async function updateLike(postId, currentUserId) {
    const response = await axios({
        method: "post",
        url: "http://localhost:8765/api/Likepost",
        headers: {
            Authorization: localStorage.getItem("Token"),
        },
        data: {
            id1: postId,
            id2: currentUserId,
        }
    });

    return response.data;
}

async function updateShare(postId, currentUserId) {
    const response = await axios({
        method: "post",
        url: "http://localhost:8765/api/sharepost",
        headers: {
            Authorization: localStorage.getItem("Token"),
        },
        data: {
            id1: postId,
            id2: currentUserId,
        }
    });

    return response.data;
}


export const followingPostSlice = createSlice({
    name: "followingPostSlice",
    initialState,
    reducers: {
        addLike: (state, action) => {
            debugger
            if (state.followingPosts !== null) {
                for (let i = 0; i < state.followingPosts.length; i++) {
                    if (state.followingPosts[i].post.id === action.payload.postId) {
                        if (!state.followingPosts[i].post.Like.includes(action.payload.userId)) {
                            state.followingPosts[i].post.Like.push(action.payload.userId);
                            updateLike(action.payload.postId, action.payload.userId);
                        } else {
                            state.followingPosts[i].post.Like = state.followingPosts[i].post.Like
                                .filter(item => item !== action.payload.userId);
                            updateLike(action.payload.postId, action.payload.userId);
                        }
                    }
                }
            }
        },

        addShare: (state, action) => {
            if (state.followingPosts !== null) {
                for (let i = 0; i < state.followingPosts.length; i++) {
                    if (state.followingPosts[i].post.id === action.payload.postId) {
                        state.followingPosts[i].post.share.push(action.payload.userId);
                        updateShare(action.payload.postId, action.payload.userId);
                    }
                }
            }
        },

        addComment: (state, action) => {
            if (state.followingPosts !== null) {
                for (let i = 0; i < state.followingPosts.length; i++) {
                    if (state.followingPosts[i].post.id === action.payload.postId) {
                        state.followingPosts[i].post.comment.push(action.payload.newComment);
                        insertComment(action.payload.postId, action.payload.newComment.content);
                    }
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFollowingPosts.fulfilled, (state, action) => {
            state.followingPosts = action.payload;
        });
    },
});


export const {addLike, addShare, addComment} = followingPostSlice.actions;
export default followingPostSlice.reducer;
