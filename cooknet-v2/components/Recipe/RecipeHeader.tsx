import RecipeMetaData from "../RecipeMetaData";

export default function RecipeHeader({
  name,
  username,
  createdAt,
  description,
}: {
  name: string;
  description: string;
  username: string;
  createdAt: Date;
}) {
  return (
    <section
      id="Header"
      className="w-full flex flex-col justify-center items-start gap-2"
    >
      <RecipeMetaData username={username} createdAt={createdAt} />
      <div className="w-full flex flex-col justify-center items-start gap-8">
        <div className="flex justify-center items-start gap-2 flex-col">
          <h1 className="text-4xl font-extrabold tracking-widest">{name}</h1>
          {description != "" && <p className="">{description}</p>}
        </div>
      </div>
    </section>
  );
}
