import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveFilter, clearCompleted } from "../redux/todos/todosSlice";

const ContentFooter = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.todos.items);
  const activeFilter = useSelector((state) => state.todos.activeFilter);
  const itemsLeft = items.filter((item) => !item.completed).length;
  console.log(itemsLeft);
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft} </strong>
        item{itemsLeft > 1 && "s"} left
      </span>

      <ul className="filters">
        <li>
          <a
            href="/#"
            onClick={() => dispatch(changeActiveFilter("all"))}
            className={activeFilter === "all" ? "selected" : ""}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="/#"
            onClick={() => dispatch(changeActiveFilter("active"))}
            className={activeFilter === "active" ? "selected" : ""}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="/#"
            onClick={() => dispatch(changeActiveFilter("completed"))}
            className={activeFilter === "completed" ? "selected" : ""}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        className="clear-completed"
        onClick={() => dispatch(clearCompleted())}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default ContentFooter;
