type props = {
  type: string;
  size: string;
  placeholder?: string;
  value?: number;
  onChange: (newValue: number) => void;
};
export default function NumberInput({
  type,
  size,
  placeholder,
  value,
  onChange,
}: props) {
  return (
    <div className="w-full">
      {size == "Large" ? (
        <input
          type={type || "number"}
          id="large-input"
          value={value == 0 ? undefined : value}
          placeholder={placeholder}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="sm:text-md  rounded-lg border border-gray-300 bg-gray-50 p-4  text-3xl font-bold leading-[41.60px] text-black focus:border-blue-500 focus:ring-blue-500 "
        />
      ) : null}
      {size == "Default" ? (
        <input
          type={type || "number"}
          id="default-input"
          placeholder={placeholder}
          value={value == 0 ? undefined : value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base font-normal leading-normal text-black  focus:border-blue-500 focus:ring-blue-500"
        />
      ) : null}
      {size == "Small" ? (
        <input
          type={type || "number"}
          placeholder={placeholder}
          value={value == 0 ? undefined : value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="x block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-xs"
        />
      ) : null}
    </div>
  );
}
