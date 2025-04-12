import Link from "next/link";
import wondersImages  from "./wonders";
import Image from "next/image";

export default function PhotoFeed() {
  return (
    <main className="container mx-auto">
      <h1 className="text-center text-3xl font-bold my-4">
        New Wonders of the World
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-4">
        {wondersImages.map(({ id, src, name }) => (
          <Link key={id} href={`/routings/photo-feed/${id}`}>
            <Image
              alt={name}
              src={src}
              className="w-full object-cover aspect-square"
            />
          </Link>
        ))}
      </div>
    </main>
  );
}