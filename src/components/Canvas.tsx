import type { ReactNode } from "react";

function Canvas({ children }: { children: ReactNode }) {
  return <div id="canvas">
    {children}
  </div>
}

export default Canvas