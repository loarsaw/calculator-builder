import React from "react";
import { Button, Display } from "../";
import { useCalcStore } from "../../features/calcSlice";

type SidebarBlockProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  isDisplay: boolean;
  data?: string[];
  isGrid: boolean | undefined;
  isOnCanvas?: boolean;
  isDisabled?: boolean;
  isOnDragEnter?: boolean;
};

export const SidebarBlock = ({
  isDisplay,
  data,
  isGrid,
  isOnCanvas,
  isDisabled,
  isOnDragEnter,
  ...props
}: SidebarBlockProps) => {
  const { operation, addNum, calculation } = useCalcStore();

  const sidebarBlockClassNames = `w-full gap-2 p-1 flex cursor-move bg-white relative mb-4 shadow-[0_2px_4px_rgba(0,0,0,0.06),0_4px_6px_rgba(0,0,0,0.1)] rounded-md ${
    isDisabled ? "pointer-events-none opacity-50" : ""
  } ${isOnCanvas ? "p-0 shadow-none" : ""} ${
    isGrid ? "grid grid-cols-2 gap-2" : "flex flex-wrap"
  } ${
    isOnDragEnter
      ? "before:content-[''] before:absolute before:bg-[url('../../assets/Vector4.svg')] before:bg-no-repeat before:w-[110%] before:h-[1rem] before:top-[-1rem] before:left-[-4px]"
      : ""
  }`;

  const buttonHandler = (symbol: string) => {
    if (!isOnCanvas) return;

    if (!isFinite(parseFloat(symbol)) && symbol !== "=" && symbol !== ".") {
      operation(symbol);
    }
    if (isFinite(parseFloat(symbol)) || symbol === ".") {
      addNum(symbol);
    }
    if (symbol === "=") {
      calculation();
    }
  };

  if (!isDisplay) {
    return (
      <div className={sidebarBlockClassNames} {...props}>
        {data?.map((item) => (
          <Button
            key={item}
            symbol={item}
            isOnCanvas={isOnCanvas}
            onClick={() => buttonHandler(item)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={sidebarBlockClassNames} {...props}>
      <Display isOnCanvas={isOnCanvas} />
    </div>
  );
};
