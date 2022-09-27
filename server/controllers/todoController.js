const Todo = require("../models/").Todo;
const expressAsyncHandler = require("express-async-handler");

const POSTTodo = expressAsyncHandler(async (req, res) => {
  const todo = await Todo.create({
    user: req.body.user,
    title: req.body.title,
    completed: req.body.completed,
  });
  res.status(201).json(todo);
});

const GETTodos = expressAsyncHandler(async (req, res) => {
  const todos = await Todo.findAll();
  res.status(200).json(todos);
});

const PUTTodoById = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  const singleTodo = await Todo.findOne({
    where: { id },
  });

  console.log(singleTodo);

  try {
    await singleTodo.update(
      {
        title: req.body.title,
        completed: singleTodo.completed === "0" ? "1" : "0",
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json(singleTodo);
  } catch (error) {
    console.log(error);
  }
});

const DELETETodo = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  const singleTodo = await Todo.findOne({
    where: { id },
  });

  try {
    await singleTodo.destroy();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json(singleTodo);
});

module.exports = {
  POSTTodo,
  GETTodos,
  PUTTodoById,
  DELETETodo,
};
