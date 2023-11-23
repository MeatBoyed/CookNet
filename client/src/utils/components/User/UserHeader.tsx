import Image from "next/image";
import ProfileThumbnail from "../../../img/ProfileThumbnail.png";

export default function UserHeader({
  name,
  noRecipes,
  followers,
  likes,
}: {
  name: string;
  noRecipes: number;
  followers: number;
  likes: number;
}) {
  return (
    <section className="flex w-full justify-between gap-10 md:flex-row">
      <Image
        className="h-20 w-24"
        // TODO: Sort out sizing
        height={96}
        width={128}
        src={ProfileThumbnail}
        alt="Recipe Thumbnail"
      />
      <div className="flex w-full flex-col gap-10">
        <div className="flex flex-col items-start justify-start gap-3">
          <div className="flex flex-col items-start justify-center gap-2">
            <p className="text-xl font-bold  text-black">{name}</p>
            <p className="text-base font-normal leading-normal text-black">
              (Optional)
            </p>
          </div>

          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm font-bold leading-normal text-black">
                {noRecipes}
              </p>
              <p className="text-sm font-normal leading-normal text-gray-400">
                Recipes
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm font-bold leading-normal text-black">
                {followers}
              </p>
              <p className="text-sm font-normal leading-normal text-gray-400">
                Followers
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm font-bold leading-normal text-black">
                {likes}
              </p>
              <p className="text-sm font-normal leading-normal text-gray-400">
                Likes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
