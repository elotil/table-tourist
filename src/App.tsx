import { useState, type CSSProperties } from "react"
import SelectionProvider from "./components/SelectionProvider"
import Sidebar from "./components/Sidebar"
import DetailsPane from "./components/DetailsPane"
import uiConfig from "../ui.config.json"
import "./App.css"

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(uiConfig.sidebar.initialWidth);
  const [detailsWidth, setDetailsWidth] = useState(uiConfig.details.initialWidth);

  const appStyle: CSSProperties & { "--sidebar-width": string, "--details-width": string }
    = { "--sidebar-width": `${sidebarWidth}px`, "--details-width": `${detailsWidth}px` };

  return (
    <div id="app" style={appStyle}>
      <SelectionProvider>
        <Sidebar onWidthChange={(width: number) =>
          setSidebarWidth(Math.max(uiConfig.sidebar.minWidth,
            Math.min(uiConfig.sidebar.maxWidth, width)
          ))
        } />
        <div id="workspace"></div>
        <DetailsPane onWidthChange={(width: number) =>
          setDetailsWidth(Math.max(uiConfig.details.minWidth,
            Math.min(uiConfig.sidebar.maxWidth, width)
          ))
        } />
      </SelectionProvider>
    </div>
  );
}

export default App
