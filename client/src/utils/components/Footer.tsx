export default function Footer() {
  return (
    <footer className=" mt-24 flex w-full flex-col items-center justify-center gap-10 bg-white ">
      <div className="flex w-full flex-col items-center justify-center gap-5 px-5">
        <p className="text-center text-base font-normal leading-normal text-black">
          Join our newsletter to stay up to date on features and releases.
        </p>
        <div className="h-12 gap-2 border border-black bg-white p-3">
          <p className="shrink grow basis-0 font-['Roboto'] text-base font-normal leading-normal text-neutral-600">
            Just Join, CookNet
          </p>
        </div>
      </div>
      <div className="h-px self-stretch bg-black" />
      <div className="flex w-full items-start justify-between gap-8 px-5 pb-10">
        <p className="font-['Roboto'] text-sm font-normal leading-[21px] text-black">
          © 2023 CookNet. All rights reserved.
        </p>
        <p className="font-['Roboto'] text-sm font-normal leading-[21px] text-black underline">
          Privacy Policy
        </p>
        <p className="font-['Roboto'] text-sm font-normal leading-[21px] text-black underline">
          Terms of Service
        </p>
      </div>
    </footer>
  );
}
