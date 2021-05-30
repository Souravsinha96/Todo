import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import Todo from "./Todo";

export default function App() {
  const [task, setTask] = useState({
    data: "",
    completed: false
  });
  const [datas, setDatas] = useState([]);
  const [pending, setPending] = useState(0);

  const [todoEditing, setTodoEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const inputEl = useRef(null);
  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const temp1 = localStorage.getItem("pending");
    const loadedTodos = JSON.parse(temp);
    const pendingTodos = JSON.parse(temp1);
    if (loadedTodos) {
      setDatas(loadedTodos);
      setPending(pendingTodos);
    }
  }, []);

  useEffect(() => {
    inputEl.current.focus();
    const temp = JSON.stringify(datas);
    localStorage.setItem("todos", temp);
    const temp1 = JSON.stringify(pending);
    localStorage.setItem("pending", temp1);
  }, [datas, pending]);

  const handleChange = () => {
    if (task.data === "") {
      setDatas(datas);
    } else {
      setDatas([...datas, task]);
      setPending(pending + 1);
    }

    setTask({ data: "" });
  };
  const handleClear = () => {
    setDatas([]);
    setPending(0);
    setEditText("");
    setTodoEditing(null);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      <input
        ref={inputEl}
        value={task.data}
        onChange={(e) => setTask({ data: e.target.value, completed: false })}
        type="text"
        placeholder="Add a new Task"
      />

      <button
        disabled={task.data === ""}
        className="added"
        type="button"
        onClick={handleChange}
      >
        ADD
      </button>

      <Todo
        pending={pending}
        setPending={setPending}
        datas={datas}
        setDatas={setDatas}
        todoEditing={todoEditing}
        setTodoEditing={setTodoEditing}
        editText={editText}
        setEditText={setEditText}
      />

      <button
        disabled={datas.length === 0}
        className="added"
        onClick={() => handleClear()}
        style={{
          fontSize: "15px"
        }}
      >
        Clear List
      </button>
    </div>
  );
}
