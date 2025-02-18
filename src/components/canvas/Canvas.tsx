import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { blocksData } from "../../data/blocksData";
import { SidebarBlock } from "../sidebar-block/SidebarBlock";
import { ButtonSwitcher } from "../ui/button-switcher/buttonSwitcher";
import { useCalcStore } from "../../features/calcSlice";
import { useConstructStore } from "../../features/constructSlice";


interface DragEvent extends React.DragEvent<HTMLDivElement> {
  dataTransfer: DataTransfer;
}

export const Canvas: React.FC = () => {
  const { reset } = useCalcStore();
  const { 
    canvasList, 
    sidebarList, 
    isRuntime, 
    deleteFromCanvas, 
    addToCanvas 
  } = useConstructStore();
  const [dragTarget, setDragTarget] = useState<string | null>(null);

  const isCanvasEmpty = canvasList.length === 0;

  const handleDragEnter = (event: DragEvent, blockType: string | "canvas") => {
    event.stopPropagation();
    setDragTarget(blockType);
  };

  const handleDrop = (event: DragEvent) => {
    event.stopPropagation();
    const blockType = event.dataTransfer.getData("blockType");
    
    setDragTarget(null);

    const blockInCanvas = canvasList.find(item => item.blockType === blockType);
    const blockInSidebar = sidebarList.find(item => item.blockType === blockType);
    const canvasIndex = canvasList.findIndex(item => item.blockType === blockType);

    if (dragTarget === blockType) return;
    if (blockInCanvas?.blockType === "display") return;

    const targetPosition = dragTarget === "canvas" 
      ? -1 
      : canvasList.findIndex(item => item.blockType === dragTarget);

    if (canvasIndex > -1) {
      deleteFromCanvas(canvasList[canvasIndex]);
      const newBlock = {
        ...blockInCanvas,
        id: blockInCanvas?.id || uuidv4(),
        isOnCanvas: true
      };
      addToCanvas(newBlock, targetPosition);
    } else if (blockInSidebar) {
      addToCanvas(
        { ...blockInSidebar, isOnCanvas: true },
        targetPosition >= 0 ? targetPosition : 0
      );
    }
  };

  const handleDeleteBlock = (blockType: string) => {
    if (isRuntime) return;
    
    const block = canvasList.find(block => block.blockType === blockType);
    if (blockType === "display") reset();
    if (block) deleteFromCanvas(block);
  };

  const handleDragStart = (event: DragEvent, blockType: string) => {
    event.dataTransfer.setData("blockType", blockType);
  };


  const infoClasses = [
    "w-full h-full flex flex-col items-center justify-center pointer-events-none text-[#333]",
    !isCanvasEmpty && "hidden"
  ].filter(Boolean).join(" ");

  return (
    <div className="flex-none relative w-[50rem] flex flex-col min-h-[43.6rem]">
      <div className="mb-4 flex justify-center items-center">
        <ButtonSwitcher />
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => handleDragEnter(e, "canvas")}
        style={{ minHeight: "43.6rem" }}
      >
        <div className={infoClasses}>
          <span></span>
        </div>

        {canvasList?.map(block => (
          <SidebarBlock
            key={uuidv4()}
            draggable={block.blockType !== "display" && !isRuntime}
            data={blocksData[block.blockType]}
            isGrid={block.blockType === "numbers"}
            isDisplay={block.blockType === "display"}
            onDragEnter={(e) => handleDragEnter(e, block.blockType)}
            onDoubleClick={() => handleDeleteBlock(block.blockType)}
            onDragStart={(e) => handleDragStart(e, block.blockType)}
            isOnCanvas={block.isOnCanvas}
            isOnDragEnter={dragTarget === block.blockType}
          />
        ))}
      </div>
    </div>
  );
};