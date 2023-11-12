export default function CategoriesSection() {
  return (
    <section
      id="Categories"
      className="flex h-full w-full items-center justify-center"
    >
      <div className="flex items-center justify-center gap-2 border border-black px-4 py-2">
        <div className=" text-base font-normal leading-normal text-black">
          View all
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 px-4 py-2">
        <div className="text-base font-normal leading-normal text-black">
          Category one
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 px-4 py-2">
        <div className="text-base font-normal leading-normal text-black">
          Category two
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 px-4 py-2">
        <div className="text-base font-normal leading-normal text-black">
          Category three
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 px-4 py-2">
        <div className="text-base font-normal leading-normal text-black">
          Category four
        </div>
      </div>
    </section>
  );
}
