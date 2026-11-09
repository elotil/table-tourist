import { useState, type CSSProperties } from "react"
import Sidebar from "./components/Sidebar"
import uiConfig from "../ui.config.json"
import "./App.css"

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(uiConfig.sidebar.initialWidth);

  const appStyle: CSSProperties & {"--sidebar-width": string }
    = { "--sidebar-width": `${sidebarWidth}px`};

  return (
    <div id="app" style={appStyle}>
      <Sidebar onWidthChange={ (width:number) =>
        setSidebarWidth(Math.max(uiConfig.sidebar.minWidth, 
          Math.min(uiConfig.sidebar.maxWidth, width)
        ))
      } />
      <div id="workspace"></div>
      <aside id="details"></aside>
    </div>
  );
}

export default App
