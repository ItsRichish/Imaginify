import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/constants";

import Collection from "@/components/shared/Collection";
import { getAllImages } from "@/lib/actions/image.actions";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

  const images = await getAllImages({ page, searchQuery });

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with Imaginify
        </h1>

        <ul className="flex-center gap-20 w-full">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              className="flex-center flex-col gap-2"
              href={link.route}
            >
              <li className="flex-center w-fit p-4 bg-white rounded-full">
                <Image src={link.icon} alt="image" height={24} width={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  );
}
