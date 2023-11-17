type props = {
  type: string;
  size: string;
  placeholder?: string;
  defaultText?: string;
};
export default function InputField(props: props) {
  return (
    <div className="w-full">
      {props.size == "Large" ? (
        <textarea
          // type={props.type}
          id="large-input"
          placeholder={props.placeholder}
          value={props.defaultText}
          className="sm:text-md  rounded-lg border border-gray-300 bg-gray-50 p-4  text-3xl font-bold leading-[41.60px] text-black focus:border-blue-500 focus:ring-blue-500 "
        />
      ) : null}
      {props.size == "Default" ? (
        <input
          type={props.type}
          id="default-input"
          placeholder={props.placeholder}
          value={props.defaultText}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base font-normal leading-normal text-black  focus:border-blue-500 focus:ring-blue-500"
        />
      ) : null}
      {props.size == "Small" ? (
        <input
          type="text"
          id="small-input"
          placeholder={props.placeholder}
          value={props.defaultText}
          className="x block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-xs"
        />
      ) : null}
    </div>
  );
}
