import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Select } from "antd";
import { addTodos, updateTodos } from "../Store/TodoReducer";
import { ShowMessage } from "./Utils";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftOutlined } from "@ant-design/icons";

const TodoForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const param = useParams();

  const titleEl = useRef(null);
  const descriptionEl = useRef(null);
  const dateEl = useRef(null);
  const { Option } = Select;

  const todolist = useSelector((state) => state.todo);

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    date: "",
    completed: false,
  });

  useEffect(() => {
    let Todo = todolist.find((item) => item.id == param.id);
    if (Todo?.title) {
      setTodo(Todo);
    }
  }, [param.id]);

  const SubmitHandler = (e) => {
    e.preventDefault();

    if (todo.title == "") {
      ShowMessage("error", `Title is Empty!`);
      titleEl.current?.focus();
    } else if (todo.description == "") {
      ShowMessage("error", `Description is Empty!`);
      descriptionEl.current?.focus();
    } else if (todo.date == "") {
      ShowMessage("error", `Date is Empty!`);
      dateEl.current?.focus();
    } else {
      if (param.id) {
        dispatch(
          updateTodos({
            id: param.id,
            ...todo,
          })
        );
        ShowMessage("success", `Item Updated Successfully!`);
      } else {
        dispatch(
          addTodos({
            id: Math.floor(Math.random() * 1000),
            ...todo,
          })
        );
        ShowMessage("success", `Item Added Successfully!`);
      }
      history.push("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleSelectChange = (value) => {
    setTodo({ ...todo, completed: value });
  };

  const backButtonHandler = () => {
    history.push("/");
  };

  return (
    <div className="row">
      <div className="App col-10 col-sm-8 col-md-5 p-4 m-4 m-auto h-100-vh position-relative">
        <form className="mt-2" onSubmit={SubmitHandler}>
          <div className="d-flex">
            <ArrowLeftOutlined className="mt-1" onClick={backButtonHandler} />
            <h5 className="todo-list-heading px-3">Add Todo</h5>
          </div>

          <div className="form-group mt-3 col-md-10 text-align">
            <label className="mt-1 mb-2" htmlFor="title">
              Title :{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={todo?.title}
              onChange={handleChange}
              ref={titleEl}
            />
          </div>
          <div className="form-group mt-3 col-md-10 text-align">
            <label className="mt-1 mb-2" htmlFor="title">
              Description :{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={todo?.description}
              onChange={handleChange}
              ref={descriptionEl}
            />
          </div>
          <div className="form-group mt-3 col-md-10 text-align">
            <label className="mt-1 mb-2" htmlFor="title">
              Date :{" "}
            </label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={todo?.date}
              onChange={handleChange}
              ref={dateEl}
            />
          </div>
          {param.id && (
            <div className="form-group mt-3 col-md-10 text-align">
              <label className="mt-1 mb-2" htmlFor="title">
                Completed :{" "}
              </label>
              <Select
                defaultValue={todo?.completed}
                className="select-container"
                onChange={handleSelectChange}
              >
                <Option value={true}>True</Option>
                <Option value={false}>False</Option>
              </Select>
            </div>
          )}
          <button type="submit" className="btn btn-primary mt-4 float-right">
            {param.id ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
