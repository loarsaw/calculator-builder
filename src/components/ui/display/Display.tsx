import { useCalcStore } from "../../../features/calcSlice";

type DisplayProps = {
  isOnCanvas: boolean | undefined;
};

export const Display = ({ isOnCanvas }: DisplayProps) => {
  const { nextValue } = useCalcStore();
  return (
    <div className="w-[50rem] h-[5.2rem] text-right pointer-events-none text-[#111827] font-normal text-[3.6rem] leading-[4.4rem] bg-[#f3f4f6] rounded-[6px] p-[4px_8px] overflow-hidden">
      {isOnCanvas ? <div>{nextValue}</div> : <div>0</div>}
    </div>
  );
};
