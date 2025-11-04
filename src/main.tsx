import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./presentation/app/App.tsx";

createRoot(document.getElementById("root")!).render(
    <App />
);
