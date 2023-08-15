import {configureStore} from "@reduxjs/toolkit";
import {useReducer} from "./Reducers/user";

const Store = configureStore ({
    reducer: {
      user: useReducer,
    }
});

export default Store