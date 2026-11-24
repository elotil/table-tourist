import { useEffect, useRef } from "react";
import type { Table } from "../types/table";
import type { Position } from "../types/util";

function DiagramNode({ table, position, registerDiv }: { table: Table, position: Position, registerDiv: (key: string, div: HTMLDivElement | null) => void }) {
  return <div className="diagram-node" ref={(div) => (registerDiv(table.name, div))}
    style={{ left: position.x, top: position.y }}>
    {table.name}
  </div>;
}

export default DiagramNode