import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SelectionContext } from "../types/selection";
import { fetchTableList, type Table } from "../types/table";
import DiagramNode from "./DiagramNode";
import Canvas from "./Canvas";
import type { Position } from "../types/util";

function Workspace() {
  const selectionContext = useContext(SelectionContext);
  const [tableList, setTableList] = useState<Table[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const initialPosition: Position = { x: 0, y: 0 };
  const divMap = useRef(new Map<string, HTMLDivElement>());
  const [divPositions, setDivPositions] = useState(new Map<string, Position>());

  const registerDiv = useCallback((key: string, div: HTMLDivElement | null) => {
    if (div) divMap.current.set(key, div);
    else divMap.current.delete(key);
  }, []);

  useLayoutEffect(() => {
    autoArrange(tableList);
  }, [tableList]);

  useEffect(() => {
    if (selectionContext.database.id) {
      fetchTableList(selectionContext.database.id).then(setTableList);
    }
  }, [selectionContext.database.id]);

  return <div id="workspace" ref={ref}>
    <Canvas>
      {tableList.map((table) => (
        <DiagramNode
          key={table.name}
          table={table}
          position={divPositions.get(table.name) ?? { x: 0, y: 0 }}
          onPositionChange={(position: Position) => {
            setDivPositions(previous => {
              const next = new Map(previous);
              next.set(table.name, position);
              return next;
            });
          }}
          registerDiv={registerDiv} />
      ))}
    </Canvas>
  </div>;

  function autoArrange(tables: Table[]) {
    const next = new Map<string, Position>();
    var maxHeight = 0;

    for (const table of tables) {
      const div = divMap.current.get(table.name);
      if (!div) return;

      // if this div won't be at least 50% visible, reset to the next row
      if (ref.current && initialPosition.x + (div.offsetWidth * 0.5) > ref.current.clientWidth) {
        initialPosition.x = 0;
        initialPosition.y += maxHeight;
        maxHeight = 0;
      }

      next.set(table.name, { ...initialPosition });
      initialPosition.x += div.offsetWidth;
      if (div.offsetHeight > maxHeight) maxHeight = div.offsetHeight;

      // if the next initial pos is offscreen, reset to the next row
      if (ref.current && initialPosition.x > ref.current.clientWidth) {
        initialPosition.x = 0;
        initialPosition.y += maxHeight;
        maxHeight = 0;
      }
    }

    setDivPositions(next);
  }
}

export default Workspace