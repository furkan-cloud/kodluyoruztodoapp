import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeActiveFilter,
  clearCompleted,
  selectTodos,
  selectActiveFilter,
} from "../redux/todos/todosSlice";

const ContentFooter = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectTodos);

  const itemsLeft = items.filter((item) => !item.completed).length;
  console.log(itemsLeft);

  const activeFilter = useSelector(selectActiveFilter);

  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
  }, [activeFilter]);

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
