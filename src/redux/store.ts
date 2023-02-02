import { configureStore } from '@reduxjs/toolkit'
import {postsReducer} from "./posts/posts-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'

export const store = configureStore({
    reducer: {
        [postsReducer.name]:postsReducer.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState>=useSelector;