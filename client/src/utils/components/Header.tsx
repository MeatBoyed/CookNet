// Make Width (w-768) Responsive
export default function Header() {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-2">
      <h2 className="text-center text-[56px] font-bold leading-[67.20px] text-black">
        CookNet Chronicles
      </h2>
      <p className="text-center text-lg font-normal leading-[27px] text-black">
        A Recipe Odyessey
      </p>
    </div>
  );
}
