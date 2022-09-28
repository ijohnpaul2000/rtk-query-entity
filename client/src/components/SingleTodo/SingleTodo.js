import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectTodoById,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../Redux/Services/todoService";
import "./SingleTodo.css";

const SingleTodo = ({ todoId }) => {
  const [isEditingInline, setIsEditingInline] = useState(false);
  const [inlineEditValue, setInlineEditValue] = useState("");

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

  const handleUpdate = () => {};

  const handleDelete = () => {
    deleteTodo({
      id: todo.id,
    });
    navigate("/");
  };

  console.log(todo);

  return (
    <article className="single-todo">
      {/* LEFT CONTROLS */}

      <div className="single-todo__contents">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
        <div className="single-todo__contents--todo">
          {isEditingInline ? (
            <div className="inline-edit">
              <input
                type="text"
                value={inlineEditValue}
                onChange={(e) => setInlineEditValue(e.target.value)}
              />
            </div>
          ) : (
            <p className="single-todo__title">{todo.title}</p>
          )}

          <i>Todo by: {todo.user}</i>
        </div>
      </div>
      <div className="single-todo__buttons">
        <button onClick={() => {}}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

      {/* RIGHT CONTROLS */}
    </article>
  );
};

export default SingleTodo;
