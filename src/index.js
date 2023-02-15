import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { AppContextProvider } from "../src/hoc/AppContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <AppContextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AppContextProvider>
  // </React.StrictMode>
);
