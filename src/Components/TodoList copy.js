import React from "react";
import { Table, Card, Modal, Button } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  removeTodos,
  updateTodos,
} from "../Store/TodoReducer";
import { Link } from "react-router-dom";
import {
  EditFilled,
  DeleteFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id)),
  };
};

const TodoList = (props) => {
  const dataSource = [...props.todos];
  const { confirm } = Modal;

  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content:
        "When clicked the OK button, this dialog will be closed after 1 second",

      // onOk() {
      //   return new Promise((resolve, reject) => {
      //     setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      //   }).catch(() => console.log("Oops errors!"));
      // },

      onCancel() {},
    });
  };

  const columns = [
    {
      title: "S.No",
      key: "s.no",
      width: "5%",
      align: "center",
      render: (value, row, index) => {
        return index + 1;
      },
    },
    {
      title: "Todo Name",
      dataIndex: "item",
      key: "item",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: "20%",
      render: (value, row, index) => {
        return (
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <li style={{ listStyle: "none" }}>
              <Link to={`/todo/update/${value.id}`}>
                <EditFilled />
              </Link>
            </li>
            <li style={{ listStyle: "none" }}>
              <a>
                <DeleteFilled
                  style={{ fontSize: "16px", color: "#e30011" }}
                  onClick={showPromiseConfirm}
                />
              </a>
            </li>
          </ul>
        );
      },
    },
  ];

  return (
    <div className="App">
      {/* //list todo //heading //todo list //add icon */}
      <h1>Todo List</h1>
      <div className="site-card-border-less-wrapper">
        <Card
          bordered={false}
          style={{
            width: 700,
          }}
        >
          <Link to={`/todo/add`}>
            <button className="add-btn" style={{ transform: "none" }}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 12 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"
                ></path>
              </svg>
            </button>
          </Link>

          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
          />
        </Card>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
