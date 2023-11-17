import Image from "next/image";
import ProfileThumbnail from "../../../img/ProfileThumbnail.png";
import ImageThumbnail from "../../../img/ImageThumbnail.png";

export default function Maininfo() {
  const ingredients: string[] = [
    "4 tablespoons all-purpose flour",
    "4 tablespoons granulated sugar",
    "2 tablespoons unsweetened cocoa powder",
    "1/8 teaspoon baking powder",
    "a pinch of salt",
    "3 tablespoons milk",
    "2 tablespoons vegetable oil",
    "1/4 teaspoon vanilla extract",
    "1 tablespoon chocolate chips (optional)",
  ];
  return (
    <div className="flex w-full flex-row justify-between gap-20">
      <Image
        className="flex h-[500px] w-[656px]"
        height={500}
        width={656}
        src={ImageThumbnail}
        alt="Recipe Thumbnail"
      />
      <div>
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col items-start justify-start gap-12">
            <div className="flex flex-col items-start justify-center gap-5">
              <div className="text-sm font-semibold leading-[21px] text-black">
                Recipe
              </div>
              <div className="text-3xl font-bold leading-[41.60px] text-black">
                Chocolate Cake
              </div>
              <div className="text-base font-normal leading-normal text-black">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros.
              </div>
            </div>

            <div className="flex flex-row items-start justify-start gap-5">
              <Image
                height={48}
                width={48}
                src={ProfileThumbnail}
                alt="Recipe Thumbnail"
              />
              <div className="flex flex-col gap-1">
                <div className="text-sm font-semibold leading-[21px] text-black">
                  Full name
                </div>
                <div className="flex items-center justify-start gap-2">
                  <div className="text-sm font-normal leading-[21px] text-black">
                    11 Jan 2022
                  </div>
                  <div className="text-lg font-normal leading-[27px] text-black">
                    •
                  </div>
                  <div className="text-sm font-normal leading-[21px] text-black">
                    5 min read
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-px w-[608px] bg-black" />

          <div className="flex flex-wrap items-center justify-start gap-1">
            {ingredients
              .sort((a, b) => a.length - b.length)
              .map((ingredient, index) => (
                <button
                  key={index}
                  className="mb-2 me-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
                >
                  {ingredient}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
