import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const getTodoAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    // const res = await fetch("http://localhost:7000/todos");
    const res = await axios("http://localhost:7000/todos")
    return res.data
    // return await res.json();
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    // items: [
    //   {
    //     id: "1",
    //     title: "learn react",
    //     completed: true,
    //   },
    //   {
    //     id: "2",
    //     title: "learn vue",
    //     completed: false,
    //   },
    // ],
    items: [],
    isLoading: false,
    error: null,
    activeFilter: "all",
  },
  extraReducers: {
    [getTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodoAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodoAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: ({ title }) => {
        return {
          payload: {
            id: nanoid(),
            completed: false,
            title: title,
          },
        };
      },
    },

    toggle: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      item.completed = !item.completed;
    },
    destroy: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },
});

export const selectTodos = (state) => state.todos.items;

export const selectFilteredTodos = (state) => {
  if (state?.todos.activeFilter === "all") {
    return state.todos.items;
  }

  return state?.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.completed === false
      : todo.completed === true
  );
};

export const { changeActiveFilter, clearCompleted, toggle, destroy, addTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
