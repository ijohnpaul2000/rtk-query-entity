import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectTodoById,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../Redux/Services/todoService";
import "./SingleTodo.css";

const SingleTodo = ({ todoId }) => {
  const todo = useSelector((state) => selectTodoById(state, todoId));

  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const navigate = useNavigate();

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
    navigate("/");
  };

  return (
    <article className="single-todo">
      <div className="single-todo__list">
        <div className="single-todo__list__item">
          <input
            type="checkbox"
            checked={todo.completed === "0" ? false : true}
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

export default SingleTodo;
