import { hydrateRoot } from "react-dom/client";
import React from "react";
import { App } from "./app";

const domNode = document.querySelector("[data-react-root]");
hydrateRoot(domNode, <App />);
