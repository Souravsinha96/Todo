import React, { useState } from "react";
import "./styles.css";
import Todo from "./Todo";

export default function App() {
  var count = 0;
  const [task, setTask] = useState({
    id: count,
    data: "",
    completed: false
  });
  const [datas, setDatas] = useState([]);
  const [pending, setPending] = useState(0);

  const handleChange = () => {
    if (task.data === "") {
      setDatas(datas);
    } else {
      setDatas([...datas, task]);
      setPending(pending + 1);
    }

    setTask({ data: "" });
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
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
        Add
      </button>

      <Todo
        pending={pending}
        setPending={setPending}
        datas={datas}
        setDatas={setDatas}
      />
    </div>
  );
}
