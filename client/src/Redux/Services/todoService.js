import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { api } from "../api";

const todoAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});
const initialState = todoAdapter.getInitialState();

export const extendedTodoSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/api/todos",
      transformResponse: (response) => {
        // we're going to transform the response to match the format of the mysql database since it's using 1 and 0 as the boolean value

        const loadedTodo = response.map((todo) => {
          todo.completed === "1"
            ? (todo.completed = true)
            : (todo.completed = false);

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
        url: "/api/todos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todos"],
      // async onQueryStarted(todo, { dispatch, queryFulfilled }) {
      //   const resultAction = await dispatch(
      //     extendedTodoSlice.endpoints.getTodos.initiate()
      //   );
      //   if (extendedTodoSlice.endpoints.getTodos.match(resultAction)) {
      //     return;
      //   }
      //   const result = await queryFulfilled;
      //   if (result.error) {
      //     dispatch(extendedTodoSlice.endpoints.getTodos.undo());
      //   }
      // },
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/api/todos/${todo.id}`,
        method: "PUT",
        body: todo,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //* arg is the payload of the action
        console.log(arg);
        //* dispatch is the dispatch function from the store
        //* queryFulfilled is a promise that resolves when the query is fulfilled
        //* updateQueryData is a function that can be used to update the query data from the cache
        const patchResult = dispatch(
          extendedTodoSlice.util.updateQueryData(
            "getTodos",
            undefined,
            (draft) => {
              const todoToUpdate = draft.entities[arg.id];
              if (todoToUpdate) {
                todoToUpdate.completed = arg.completed;
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      // invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: (todo) => ({
        url: `/api/todos/${todo.id}`,
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
