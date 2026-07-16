import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@fontsource-variable/geist/wght.css"
import "@fontsource-variable/jetbrains-mono/wght.css"
import "@fontsource-variable/manrope/wght.css"

import { App } from "./app/app"
import "./index.css"

const rootElement = document.getElementById("root")

if (rootElement === null) {
  throw new Error("DittoJs web builder root element was not found.")
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
