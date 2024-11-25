import "./index.css";
import { createRoot } from "react-dom/client";
import { Toaster } from "./components/ui/toaster";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
);
