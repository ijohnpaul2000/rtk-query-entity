const router = require("express").Router();

const {
  POSTTodo,
  GETTodos,
  PUTTodoById,
  DELETETodo,
} = require("../controllers/todoController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", POSTTodo);
router.get("/", GETTodos);
router.put("/:id", PUTTodoById);
router.delete("/:id", DELETETodo);

module.exports = router;
