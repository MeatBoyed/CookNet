export default function CategoriesSection() {
  return (
    <section
      id="Categories"
      className="flex w-full items-center justify-center gap-2"
    >
      <div className="border border-black bg-black p-2 text-white">
        <p className=" text-base font-normal leading-normal">View all</p>
      </div>
      <div className="border border-black p-2">
        <p className="text-base font-normal leading-normal">Meals</p>
      </div>
      <div className="border border-black p-2">
        <p className="text-base font-normal leading-normal">Dessert</p>
      </div>
    </section>
  );
}
