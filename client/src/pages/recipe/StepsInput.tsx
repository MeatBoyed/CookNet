import InputField from "~/utils/components/InputField";
import StepCard from "~/utils/components/RecipePage/StepCard";

type props = {
  steps?: string;
};

export default function StepsInput(props: props) {
  const steps: string[] = [
    "Take a microwave-safe mug; make sure it's large enough to avoid overflow.",
    "In the mug, whisk together the flour, sugar, cocoa powder, baking powder, and a pinch of salt until well mixed.",
  ];

  return (
    <div className="mt-10 flex flex-wrap items-start justify-center gap-5 ">
      {steps.map((step, index) => (
        <StepCard step={step} key={index} stepNo={index + 1} />
      ))}
      <div className="flex w-96 flex-col items-center justify-center gap-5 rounded-3xl border border-gray-300 bg-white p-8 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 ">
        <p className="text-3xl font-bold leading-[41.60px] text-black">Step</p>
        <InputField size="Default" type="text" placeholder="Add A Step" />
        <button className="flex w-full items-center justify-center gap-2 rounded-full border border-black bg-black py-2 text-sm font-normal leading-normal text-white">
          Add Step
        </button>
      </div>
    </div>
  );
}
