import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { api } from "../api";

const todoAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});
const initialState = todoAdapter.getInitialState();

export const extendedTodoSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/api/applicants",
      transformResponse: (response) => {
        const loadedTodo = response.map((todo) => {
          return {
            ...todo,
          };
        });
        return todoAdapter.setAll(initialState, loadedTodo);
      },
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "DELETE",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const selectTodoResult = extendedTodoSlice.endpoints.getTodos.select();

const selectTodoData = createSelector(
  selectTodoResult,
  (todoResult) => todoResult.data
);

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoId,
  selectTotal: selectTotalTodos,
} = todoAdapter.getSelectors((state) => selectTodoData(state) ?? initialState);

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = extendedTodoSlice;
