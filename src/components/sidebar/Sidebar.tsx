import React from "react";
import { SidebarBlock } from "../sidebar-block/SidebarBlock";
import { blocksData } from "../../data/blocksData";
import { useCalcStore } from "../../features/calcSlice";
import { useConstructStore } from "../../features/constructSlice";

export const Sidebar = () => {
  const { isRuntime, sidebarList } = useConstructStore();
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    blockType: string
  ) => {
    e.dataTransfer.setData("blockType", blockType);
  };

  const sidebarClassNames = `flex-none transition-all duration-300 ${
    isRuntime ? "opacity-0 pointer-events-none" : "w-96"
  }`;

  return (
    <div className={sidebarClassNames}>
      {sidebarList.map((block) => (
        <SidebarBlock
          key={block.id}
          draggable
          data={blocksData[block.blockType]}
          isGrid={block.blockType === "numbers"}
          isDisplay={block.blockType === "display"}
          onDragStart={(e) => onDragStart(e, block.blockType)}
          isOnCanvas={block.isOnCanvas}
          isDisabled={block.isOnCanvas}
        />
      ))}
    </div>
  );
};
