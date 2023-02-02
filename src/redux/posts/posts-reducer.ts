import {createSlice} from '@reduxjs/toolkit';
import {fetchPosts, fetchFilterById} from "./posts-operations";
import {IPosts} from "../../models";
interface IState {
    items: IPosts[] | null,
    totalPages:number
    filterPostsById:IPosts | null,
    error:any
}


const initialState = {
    items:null,
    totalPages:0,
    filterPostsById:null,
    error:null
} as IState;


export const postsReducer = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        'clearPosts':(state,{payload}) => {
            state.items=payload
            state.totalPages=0
        },
        'clearFilterPosts':(state, {payload}) => {
            state.filterPostsById=payload
        },
        'resetErrorFilter':(state, {payload}) => {
            state.error=payload
        },

    },
    extraReducers (builder){
        builder
            .addCase(fetchPosts.fulfilled,(state, {payload}) => {
                state.items=payload.result;
                state.totalPages=payload.totalPages
            })

            .addCase(fetchFilterById.fulfilled,(state, {payload}) => {
                state.filterPostsById=payload;
            })

            .addCase(fetchPosts.rejected,(state, {payload}) => {
                state.error=payload
            })

            .addCase(fetchFilterById.rejected,(state, {payload}) => {
                state.error=payload;
            })

    }
})

 export const {clearPosts, clearFilterPosts, resetErrorFilter}=postsReducer.actions;
