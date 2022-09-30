import { configureStore } from "@reduxjs/toolkit";
import { todoreducer } from "./TodoReducer";

const store = configureStore({
  reducer: { todo: todoreducer },
});

export default store;
