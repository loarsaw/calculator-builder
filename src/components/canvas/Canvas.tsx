import React, { useMemo, useState } from "react";
import { blocksData } from "../../data/blocksData";
import { SidebarBlock } from "../sidebar-block/SidebarBlock";
import { useCalcStore } from "../../features/calcSlice";
import { useConstructStore } from "../../features/constructSlice";
import { v4 } from "uuid";
import { ButtonSwitcher } from "../ui/button-switcher/buttonSwitcher";

export const Canvas = () => {
  const { reset } = useCalcStore();
  const { canvasList, sidebarList, isRuntime, deleteFromCanvas, addToCanvas } =
    useConstructStore();
  const [onDragEnterBlock, setOnDragEnterBlock] = useState<string | null>(null);

  const onDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    blockType: string | "canvas"
  ) => {
    e.stopPropagation();
    setOnDragEnterBlock(blockType);
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOnDragEnterBlock(null);

    const blockType = e.dataTransfer.getData("blockType");
    const blockInCanvas = canvasList.find(
      (item) => item.blockType === blockType
    );
    const indexBlockInCanvas = canvasList.findIndex(
      (item) => item.blockType === blockType
    );
    const blockInSidebar = sidebarList.find(
      (item) => item.blockType === blockType
    );
    if (onDragEnterBlock === blockType) return;
    if (blockInCanvas?.blockType === "display") return;

    if (indexBlockInCanvas > -1) {
      deleteFromCanvas(canvasList[indexBlockInCanvas]);
      const position =
        onDragEnterBlock === "canvas"
          ? -1
          : canvasList.findIndex((item) => item.blockType === onDragEnterBlock);
      const newBlock = {
        ...blockInCanvas,
        id: blockInCanvas?.id || v4(),
        isOnCanvas: true,
      };
      // @ts-ignore
      addToCanvas(newBlock, position);
    } else if (blockInSidebar) {
      const position =
        onDragEnterBlock === "canvas"
          ? -1
          : canvasList.findIndex((item) => item.blockType === onDragEnterBlock);
      addToCanvas(
        { ...blockInSidebar, isOnCanvas: true },
        position >= 0 ? position : 0
      );
    }
  };

  const deleteBlockHandler = (blockType: string) => {
    if (isRuntime) return;
    const block = canvasList.find((block) => block.blockType === blockType);
    if (blockType === "display") reset();
    block && deleteFromCanvas(block);
  };

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    blockType: string
  ) => {
    e.dataTransfer.setData("blockType", blockType);
  };

  const canvasClassNames = [
    "canvas",
    onDragEnterBlock === "canvas" && canvasList.length === 0
      ? "canvas__initial--onDrag"
      : null,
    canvasList.length === 0 ? "canvas__initial" : null,
    onDragEnterBlock === "canvas" &&
    canvasList.length > 0 &&
    canvasList.length < 3
      ? "canvas__insert--down"
      : null,
  ]
    .filter(Boolean)
    .join(" ");

  const canvasInfoClassNames = [
    "w-full h-full flex flex-col items-center justify-center pointer-events-none text-[#333]",
    canvasList.length > 0 ? "hidden" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`
        flex-none relative 
        w-[50rem] 
        flex flex-col // Flex column for layout
        min-h-[43.6rem] // Minimum height to match canvas size
      `}
    >
      {/* Ensure the ButtonSwitcher is positioned properly above the canvas */}
      <div className="mb-4 flex justify-center items-center"> {/* Centered the button */}
        <ButtonSwitcher />
      </div>

      <div
        className={canvasClassNames}
        onDrop={onDropHandler}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => onDragEnter(e, "canvas")}
        style={{ minHeight: "43.6rem" }} // Ensures the canvas gets the minimum height
      >
        <div className={canvasInfoClassNames}>
          <span></span>
        </div>

        {canvasList?.map((block) => (
          <SidebarBlock
            key={v4()}
            draggable={block.blockType !== "display" && !isRuntime}
            data={blocksData[block.blockType]}
            isGrid={block.blockType === "numbers"}
            isDisplay={block.blockType === "display"}
            onDragEnter={(e) => onDragEnter(e, block.blockType)}
            onDoubleClick={() => deleteBlockHandler(block.blockType)}
            onDragStart={(e) => onDragStart(e, block.blockType)}
            isOnCanvas={block.isOnCanvas}
            isOnDragEnter={onDragEnterBlock === block.blockType}
          />
        ))}
      </div>
    </div>
  );
};
