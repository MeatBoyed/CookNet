import Image from "next/image";

interface props {
  username: string | null;
  recipes: number;
  favorites: number;
  profileImage: string;
}

export default function UserHeader({
  username,
  recipes,
  favorites,
  profileImage,
}: props) {
  return (
    <section
      id="ProfileHeader"
      className="w-full flex justify-center items-start gap-16"
    >
      <Image
        className="rounded-full"
        // TODO: Sort out sizing
        height={80}
        width={80}
        src={profileImage}
        alt="Recipe Thumbnail"
      />
      <div className="flex flex-col justify-center items-start gap-5">
        <p className="text-xl font-bold capitalize">{username}</p>

        <div className="flex justify-between items-center gap-10">
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm font-bold leading-normal ">{recipes}</p>
            <p className="text-sm font-normal leading-normal ">Recipes</p>
          </div>
          {/* <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-bold leading-normal ">5</p>
            <p className="text-sm font-normal leading-normal ">Followers</p>
          </div> */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-bold leading-normal ">{favorites}</p>
            <p className="text-sm font-normal leading-normal ">Favorites</p>
          </div>
        </div>
        {/* <Button className="w-full">Follow</Button> */}
      </div>
    </section>
  );
}
