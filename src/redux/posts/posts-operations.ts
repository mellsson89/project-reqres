import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {IPosts} from "../../models";

axios.defaults.baseURL='https://reqres.in/api/products';

interface IArg {
    perPage:number,
    page:number
}

interface IData {
    data:IPosts[],
    total_pages:number
}

interface IFilter {
    data:IPosts
}



export const fetchPosts = createAsyncThunk('fetchPosts', async (arg:IArg,{rejectWithValue}) => {

    try {
       const {data:{data:result,total_pages:totalPages}} =  await axios.get<IData>(`/?per_page=${arg.perPage}&page=${arg.page}`);
         return {result, totalPages};
    }
    catch (error:any) {
        return rejectWithValue(error.response.status)
    }
})

export const fetchFilterById = createAsyncThunk('fetchFilterById', async (id:number,{rejectWithValue}) => {
    try {
        const {data:{data}}  =  await axios.get<IFilter>(`/?id=${id}`);
        return data;
    }
    catch (error:any) {
        return rejectWithValue(error.response.status)
    }
})