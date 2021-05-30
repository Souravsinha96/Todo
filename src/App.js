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
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, [datas]);

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
