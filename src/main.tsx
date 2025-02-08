import { createRoot } from "react-dom/client";
import React from "react";

const domNode = document.querySelector("[data-react-root]");
const root = createRoot(domNode);

root.render(<div>client side render from react</div>);
