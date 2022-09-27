const router = require("express").Router();

const {
  POSTTodo,
  GETTodos,
  PUTTodoById,
  DELETETodo,
} = require("../controllers/todoController");

router.post("/", POSTTodo);
router.get("/", GETTodos);
router.put("/:id", PUTTodoById);
router.delete("/:id", DELETETodo);

module.exports = router;
