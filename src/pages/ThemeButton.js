import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme} (click to toggle)
    </button>
  );
};

export default ThemeButton;