import Image from "next/image";
import ProfileThumbnail from "../../public/ProfileThumbnail.png";
import { Button } from "../ui/button";
import { User } from "@clerk/nextjs/server";

interface props {
  user: User;
}

export default function UserHeader({ user }: props) {
  return (
    <section
      id="ProfileHeader"
      className="w-full flex justify-center items-center gap-16"
    >
      <Image
        className="h-20 w-24"
        // TODO: Sort out sizing
        height={96}
        width={128}
        src={ProfileThumbnail}
        alt="Recipe Thumbnail"
      />
      <div className="flex flex-col justify-center items-start gap-5">
        <p className="text-xl font-bold capitalize">{user.username}</p>

        <div className="flex justify-between items-center gap-10">
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm font-bold leading-normal ">10</p>
            <p className="text-sm font-normal leading-normal ">Recipes</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-bold leading-normal ">5</p>
            <p className="text-sm font-normal leading-normal ">Followers</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-bold leading-normal ">3</p>
            <p className="text-sm font-normal leading-normal ">Likes</p>
          </div>
        </div>
        <Button className="w-full">Follow</Button>
      </div>
    </section>
  );
}
