import { useConstructStore } from "../../../features/constructSlice";

export const ButtonSwitcher = () => {
  const { isRuntime, toggleRuntime } = useConstructStore();
  const handleClick = (type: boolean) => {
    toggleRuntime(type);
  };

  const svgColor = [
    !isRuntime ? "#5D5FEF" : "#4D5562",
    isRuntime ? "#5D5FEF" : "#4D5562",
  ];

  return (
    <div className="switch-field absolute top-[-6rem] w-full flex items-center font-medium text-[#4d5562] text-[1.4rem] leading-[1.5rem] rounded-[6px] bg-[#f3f4f6]">
      <input
        type="radio"
        id="radio-one"
        name="switch-one"
        value="yes"
        checked={isRuntime}
        onChange={() => handleClick(true)}
        className="hidden"
      />
      <label
        htmlFor="radio-one"
        className="bg-[#f3f4f6] text-[rgba(0,0,0,0.6)] text-[14px] leading-1 text-center py-[1.1rem] px-[1.2rem] mr-[-1px] transition-all duration-100 ease-in-out w-full rounded-[6px] border border-[#f3f4f6] flex items-center gap-[8px] hover:cursor-pointer hover:bg-[#ffffff] hover:border-[#e2e3e5]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7678 11.7678C12.2366 11.2989 12.5 10.663 12.5 10C12.5 9.33696 12.2366 8.70107 11.7678 8.23223C11.2989 7.76339 10.663 7.5 10 7.5C9.33696 7.5 8.70107 7.76339 8.23223 8.23223C7.76339 8.70107 7.5 9.33696 7.5 10C7.5 10.663 7.76339 11.2989 8.23223 11.7678C8.70107 12.2366 9.33696 12.5 10 12.5C10.663 12.5 11.2989 12.2366 11.7678 11.7678Z"
            stroke={svgColor[1]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.04834 9.99999C3.11001 6.61916 6.26917 4.16666 10 4.16666C13.7317 4.16666 16.89 6.61916 17.9517 9.99999C16.89 13.3808 13.7317 15.8333 10 15.8333C6.26917 15.8333 3.11001 13.3808 2.04834 9.99999Z"
            stroke={svgColor[1]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Runtime</span>
      </label>

      <input
        type="radio"
        id="radio-two"
        name="switch-one"
        value="no"
        checked={!isRuntime}
        onChange={() => handleClick(false)}
        className="hidden"
      />
      <label
        htmlFor="radio-two"
        className="bg-[#f3f4f6] text-[rgba(0,0,0,0.6)] text-[14px] leading-1 text-center py-[1.1rem] px-[1.2rem] transition-all duration-100 ease-in-out w-full rounded-[6px] border border-[#f3f4f6] flex items-center gap-[8px] hover:cursor-pointer hover:bg-[#ffffff] hover:border-[#e2e3e5]"
      >
        <svg
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 8.33334L1.16666 5.00001L4.5 1.66668M9.5 1.66668L12.8333 5.00001L9.5 8.33334"
            stroke={svgColor[0]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Constructor</span>
      </label>
    </div>
  );
};
