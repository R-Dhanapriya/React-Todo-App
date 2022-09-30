import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const TodoReducer = createSlice({
  name: "title",
  initialState,
  reducers: {
    addTodos: (state, action) => {
      state.push(action.payload);
      return state;
    },

    deleteTodos: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },

    updateTodos: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            ...action.payload,
          };
        }
        return todo;
      });
    },

    completeTodos: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      });
    },
  },
});

export const { addTodos, deleteTodos, updateTodos, completeTodos } =
  TodoReducer.actions;

export const todoreducer = TodoReducer.reducer;
