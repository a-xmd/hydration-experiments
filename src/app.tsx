import React from "react";

export const App = () => {
  return (
    <main>
      <h1>title</h1>
      <p>some paragraph</p>
      <button
        onClick={() => {
          console.log("CLICK");
        }}
      >
        click me
      </button>
    </main>
  );
};
