import Image from "next/image";
import ImageThumbnail from "../../img/ImageThumbnail.png";

export default function RecipeCard() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-3">
      <Image
        height={300}
        width={400}
        src={ImageThumbnail}
        alt="Recipe Thumbnail"
        className="w-full"
      />
      <div className="flex flex-col items-start justify-start gap-1">
        <p className="space-x-2 font-['Roboto'] text-xs font-semibold text-black">
          Meal
        </p>
        <p className="font-['Roboto'] text-xl font-bold text-black">
          Chocolate Cake
        </p>
        <p className="font-['Roboto'] text-sm font-normal text-black">
          The best Chocolate cake in the world omd
        </p>
      </div>
      <div className="flex w-full items-center justify-start gap-2">
        <p className="font-['Roboto'] text-sm font-semibold leading-[21px] text-black">
          Charles Rossouw
        </p>
        {/* <div className="font-['Roboto'] text-lg font-normal text-black">•</div> */}
        {/* <div className="font-['Roboto'] text-sm font-normal leading-[21px] text-black">
          11 Jan 2022
        </div> */}
      </div>
    </div>
  );
}
