import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/currentUser";
import CurrentUserCheker from "./components/currentUserCheker";

ReactDOM.render(
  <CurrentUserProvider>
    <CurrentUserCheker>
      <Router>
        <App />
      </Router>
    </CurrentUserCheker>
  </CurrentUserProvider>,
  document.getElementById("root")
);
