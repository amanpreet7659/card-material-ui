import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const loadingImage = (
  <div
    style={{
      height: "100%",
      width: "100%",
      border: "2px #9A0000 solid",
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
    }}
  >
    <img src="/assets/images/home1.png" />
  </div>
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={loadingImage}>
    <React.StrictMode>
      <div className="container">
        <App />
      </div>
    </React.StrictMode>
  </Suspense>
);
