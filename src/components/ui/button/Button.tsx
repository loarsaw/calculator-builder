import React from "react";
import { useConstructStore } from "../../../features/constructSlice";

type ButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  symbol: string;
  isOnCanvas: boolean | undefined;
};

export const Button = ({ symbol, isOnCanvas, ...props }: ButtonProps) => {
  const { isRuntime } = useConstructStore();

  return (
    <button
      className={`flex-1 h-[4.8rem] cursor-pointer rounded-[6px] border-[1px] border-[#e2e3e5] font-medium text-[1.4rem] leading-[1.5rem] text-center transition-all duration-200 
        ${!isRuntime ? "pointer-events-none opacity-50" : ""}
        ${symbol === "=" ? "bg-[#5d5fef] text-white" : ""}`}
      {...props}
    >
      {symbol}
    </button>
  );
};
