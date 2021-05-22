import React, { useState } from "react";
import "./styles.css";

export default function Todo({ datas, setDatas, pending, setPending }) {
  const handleDelete = (selected) => {
    const newData = datas.filter((set, index) => index !== selected);
    setDatas(newData);
    if (pending < 1) {
      setPending(0);
    } else if (!newData.completed) {
      setPending(pending - 1);
    }
  };

  const handleComplete = (selected) => {
    const newData = datas.map((data, index) =>
      index === selected ? { ...data, completed: true } : data
    );
    setDatas(newData);
    if (pending < 1) {
      setPending(0);
    } else {
      setPending(pending - 1);
    }
  };
  return (
    <div className="container">
      <h3>Pending Task: {pending}</h3>
      {datas.map(({ data, completed }, index) => (
        <div className="main" key={index}>
          <h4
            style={{
              textDecorationLine: completed ? "line-through" : undefined,
              marginLeft: "1rem",
              letterSpacing: "0.5px",
              width: "200px"
            }}
          >
            {data}
          </h4>
          <button
            className="disabledbutton"
            disabled={completed === true}
            onClick={() => {
              handleComplete(index);
            }}
          >
            Complete
          </button>
          <button
            className="added"
            style={{
              backgroundColor: "firebrick",
              marginRight: "1rem",
              padding: "0 15px"
            }}
            onClick={() => handleDelete(index)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
