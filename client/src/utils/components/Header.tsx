// Make Width (w-768) Responsive
export default function Header() {
  return (
    <div className="flex h-[225px] w-[768px] flex-col items-center justify-start gap-4">
      <div className="text-center text-base font-semibold leading-normal text-black">
        Blog
      </div>
      <div className="flex h-[185px] flex-col items-center justify-start gap-6 ">
        <div className="text-center text-[56px] font-bold leading-[67.20px] text-black">
          Describe what your blog is about
        </div>
        <div className="text-center text-lg font-normal leading-[27px] text-black">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
        </div>
      </div>
    </div>
  );
}
