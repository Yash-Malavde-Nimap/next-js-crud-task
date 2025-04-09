"use client";
import React, { useState } from "react";

const Interactive = () => {
  const [count, setCount] = useState(1);

  return (
    <div style={{ display: "flex", gap: "10px", color: "white" }}>
      <p style={{fontSize:"22px"}}>Count : {count}</p>
      <p style={{fontSize:"22px",cursor:"pointer"}} onClick={() => setCount((prev) => prev + 1)}>add</p>
    </div>
  );
};

export default Interactive;
