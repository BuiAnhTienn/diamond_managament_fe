import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ThemeProvider from "@themes/ThemProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/">
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
