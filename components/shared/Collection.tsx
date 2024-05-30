"use client";

import { IImage } from "@/lib/database/models/image.model";
import { useParams, useRouter } from "next/navigation";
import Search from "./Search";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Button } from "../ui/button";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { transformationTypes } from "@/constants";

const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useParams();

  const onPageChange = (action: string) => {};

  return (
    <>
      <div className="collection-heading">
        <h2 className="h2-bold text-dark-600">Recent Edits</h2>
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <ul className="collection-list">
          {images.map((image, idx) => (
            <Card image={image} key={idx} />
          ))}
        </ul>
      ) : (
        <div className="collection-empty">
          <p className="p-20-semibold">Empty List</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full">
            <Button
              disabled={Number(page) <= 1}
              className="collection-btn"
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </Button>

            <p className="flex-center p-16-medium w-fit flex-1">
              {page} / {totalPages}
            </p>

            <Button
              className="button w-32 bg-purple-gradient bg-cover text-white"
              onClick={() => onPageChange("next")}
              disabled={Number(page) >= totalPages}
            >
              <PaginationNext className="hover:bg-transparent hover:text-white" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default Collection;

const Card = ({ image }: { image: IImage }) => {
  return (
    <li>
      <Link href={`/transformations/${image._id}`} className="collection-card">
        <CldImage
          className="h-52 w-full rounded-[10px] object-cover"
          src={image.publicId}
          alt={image.title}
          height={image.height}
          width={image.width}
          {...image.config}
          loading="lazy"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />

        <div className="flex-between">
          <p className="p-20-semibold mr-3 line-clamp-1 text-dark-600">
            {image.title}
          </p>

          <Image
            src={`/assets/icons/${
              transformationTypes[
                image.transformationType as TransformationTypeKey
              ].icon
            }`}
            alt={image.title}
            height={24}
            width={24}
          />
        </div>
      </Link>
    </li>
  );
};
