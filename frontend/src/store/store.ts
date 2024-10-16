
import { configureStore } from "@reduxjs/toolkit";
import sliceAuthReducer from './slice/sliceAuthReducer';

export const store = configureStore({
    reducer: {
        auth: sliceAuthReducer,
    },
});

