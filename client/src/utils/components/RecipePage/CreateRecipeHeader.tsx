export default function CreateRecipeHeader() {
  return (
    <div className="inline-flex h-[158px] w-full flex-col items-start justify-start gap-4">
      <div className="text-base font-semibold leading-normal text-black">
        Create
      </div>
      <div className="flex h-[118px] flex-col items-center justify-start gap-6 self-stretch">
        <div className="self-stretch text-[56px] font-bold leading-[67.20px] text-black">
          Back
        </div>
        <div className="self-stretch text-lg font-normal leading-[27px] text-black">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
        </div>
      </div>
    </div>
  );
}
