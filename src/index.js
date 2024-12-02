import React, { createContext, useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";

// Create a ThemeContext to hold the theme state
const ThemeContext = createContext();

// ThemeProvider component that will manage the theme state
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage when the app is first loaded
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Save the selected theme to localStorage and update the body element
  useEffect(() => {
    localStorage.setItem("app-theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// App component that displays the theme and provides the toggle button
const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <h1>Theme Switcher App</h1>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme} className="theme-toggle-btn">
        Toggle Theme
      </button>
    </div>
  );
};

// Styles for light and dark themes
const styles = `
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    transition: background-color 0.3s, color 0.3s;
  }

  /* Light theme */
  body[data-theme="light"] {
    background-color: #ffffff;
    color: #000000;
  }

  /* Dark theme */
  body[data-theme="dark"] {
    background-color: #000000;
    color: #ffffff;
  }

  /* Button styling */
  .theme-toggle-btn {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    margin: 20px;
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Render the app component with the ThemeProvider
ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
