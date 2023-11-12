import Image from "next/image";
import ImageThumbnail from "../../img/ImageThumbnail.png";
import ProfileThumbnail from "../../img/ProfileThumbnail.png";

export default function RecipeCard() {
  return (
    <div className="inline-flex h-[515px] w-[416px] flex-col items-start justify-start gap-6">
      <Image
        height={300}
        width={416}
        src={ImageThumbnail}
        alt="Recipe Thumbnail"
      />
      <div className="flex h-[119px] flex-col items-start justify-start gap-2 self-stretch">
        <div className="self-stretch font-['Roboto'] text-sm font-semibold leading-[21px] text-black">
          Category
        </div>
        <div className="self-stretch font-['Roboto'] text-2xl font-bold leading-[33.60px] text-black">
          Blog title heading will go here
        </div>
        <div className="self-stretch font-['Roboto'] text-base font-normal leading-normal text-black">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros.
        </div>
      </div>
      <div className="inline-flex items-center justify-start gap-4 self-stretch">
        <Image
          className="self-stretch"
          height={48}
          width={48}
          src={ProfileThumbnail}
          alt="Recipe Thumbnail"
        />
        <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start">
          <div className="self-stretch font-['Roboto'] text-sm font-semibold leading-[21px] text-black">
            Full name
          </div>
          <div className="inline-flex items-center justify-start gap-2 self-stretch">
            <div className="font-['Roboto'] text-sm font-normal leading-[21px] text-black">
              11 Jan 2022
            </div>
            <div className="font-['Roboto'] text-lg font-normal leading-[27px] text-black">
              •
            </div>
            <div className="font-['Roboto'] text-sm font-normal leading-[21px] text-black">
              5 min read
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
