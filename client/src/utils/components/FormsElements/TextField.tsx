import { Dispatch, SetStateAction } from "react";

type props = {
  name?: string;
  type: string;
  size: string;
  placeholder?: string;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};
export default function TextField({
  name,
  type,
  size,
  placeholder,
  text,
  setText,
}: props) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <div className="w-full text-sm font-medium leading-[21px] text-black">
        {name}
      </div>
      {size == "Large" ? (
        <input
          type={type || "text"}
          id="large-input"
          value={text}
          placeholder={placeholder}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="sm:text-md  w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-3xl font-bold leading-[41.60px] text-black focus:border-blue-500 focus:ring-blue-500 "
        />
      ) : null}
      {size == "Default" ? (
        <input
          type={type || "text"}
          id="default-input"
          placeholder={placeholder}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base font-normal leading-normal text-black  focus:border-blue-500 focus:ring-blue-500"
        />
      ) : null}
      {size == "Small" ? (
        <input
          type={type || "text"}
          placeholder={placeholder}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="x block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-xs"
        />
      ) : null}
    </div>
  );
}
