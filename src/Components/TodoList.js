import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodos, updateTodos } from "../Store/TodoReducer";
import {
  EditFilled,
  DeleteFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { ShowMessage } from "./Utils";

import { Modal } from "antd";

const TodoList = () => {
  const todolist = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  const { confirm } = Modal;

  const checkedHandler = (item, e) => {
    let UpdateItem = {
      ...item,
      completed: e.target.checked,
    };
    dispatch(updateTodos(UpdateItem));
  };

  const showPromiseConfirm = (itemId) => {
    confirm({
      title: "Do you want to delete this items?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      onOk() {
        dispatch(deleteTodos(itemId));
        ShowMessage("success", `Item Deleted Successfully!`);
      },

      onCancel() {},
    });
  };
  return (
    <div className="row">
      <div className="App col-10 col-sm-8 col-md-5 p-4 m-4 m-auto h-100-vh position-relative">
        {/* //list todo //heading //todo list //add icon */}
        <h2 className="mb-4">Todo App</h2>
        <div className="row ">
          <div className="col-md-12">
            <h6 className="todo-list-heading">TODO LIST</h6>
            <ul className="todo-list">
              {todolist.map((item, index) => {
                return (
                  <li className="todo-item" key={index}>
                    <div className="container">
                      <input
                        type="checkbox"
                        value="completed"
                        name="completed"
                        id="completed"
                        checked={Boolean(item.completed)}
                        onChange={checkedHandler.bind(this, item)}
                      />
                      <label
                        htmlFor="completed"
                        className={`${
                          item.completed && "text-decoration-line-through"
                        } fs-18`}
                      >
                        {item.title}
                      </label>
                      <div className="link-container">
                        <Link to={`/todo/update/${item.id}`} className="px-3">
                          <EditFilled className="edit-icon" />
                        </Link>

                        <DeleteFilled
                          onClick={showPromiseConfirm.bind(this, item.id)}
                          className="delete-icon"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <Link to={`/todo/add`}>
          <button className="add-btn">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 12 16"
              height="0.5em"
              width="0.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"
              ></path>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TodoList;
