type props = {
  stepNo: number;
  step: string;
};
export default function StepCard(props: props) {
  return (
    <div className="flex w-96 flex-col items-center justify-center gap-5 rounded-3xl border border-gray-300 bg-white p-8 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 ">
      <p className="text-3xl font-bold leading-[41.60px] text-black">
        Step {props.stepNo}{" "}
      </p>
      <div className="text-center text-base font-normal leading-normal text-black">
        {props.step}
      </div>
    </div>
  );
}
