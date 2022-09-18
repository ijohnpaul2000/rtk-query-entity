import React from "react";
import { useSelector } from "react-redux";
import {
  selectTodoById,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../Redux/Features/todoSlice";

const Todo = ({ todoId }) => {
  const todo = useSelector((state) => selectTodoById(state, todoId));

  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleToggle = () => {
    updateTodo({
      id: todo.id,
      completed: !todo.completed,
    });
  };
  const handleDelete = () => {
    deleteTodo({
      id: todo.id,
    });
  };
  return (
    <article className="single-todo">
      <div className="single-todo__list">
        <div className="single-todo__list__item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
          />
          <h2>{todo.title}</h2>
        </div>
        <i>Todo by: {todo.user}</i>
      </div>
      <div className="button-wrapper">
        <button onClick={handleDelete}>Delete</button>
      </div>
    </article>
  );
};

export default Todo;
