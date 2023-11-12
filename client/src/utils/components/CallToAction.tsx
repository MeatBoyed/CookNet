export default function CallToAction() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-20 bg-white py-28">
      <div className="flex flex-col items-center justify-start gap-6">
        <div className="flex w-full flex-col items-center justify-start gap-6 ">
          <div className="flex flex-col items-center justify-start">
            <div className="text-center text-6xl font-bold leading-[67.20px] text-black">
              Medium length CTA{" "}
            </div>
            <div className="text-center text-6xl font-bold leading-[67.20px] text-black">
              heading goes here
            </div>
          </div>
          <div className="text-center text-lg font-normal leading-[27px] text-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </div>
        </div>
        <div className="flex items-start justify-start gap-4 pt-4">
          <div className="flex items-center justify-center gap-2 border border-black bg-black px-6 py-3">
            <div className="text-base font-normal leading-normal text-white">
              Button
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 border border-black px-6 py-3">
            <div className="text-base font-normal leading-normal text-black">
              Button
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
