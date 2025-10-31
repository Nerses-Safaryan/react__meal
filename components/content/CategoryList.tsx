'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type Props = {
  categories: Category[];
};

export default function CategoryList({ categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  const current = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return categories.slice(start, start + itemsPerPage);
  }, [page, categories]);

  return (
    <div>
      <ul className="grid grid-cols-4 gap-5">
        {current.map((item) => (
          <li className="shadow-md rounded-md p-3" key={item.idCategory}>
            <Image
              src={item.strCategoryThumb}
              alt={item.strCategory}
              width={300}
              height={300}
              priority
              quality={100}
            />
            <h4 className="font-bold text-gray-800">{item.strCategory}</h4>
            <p>
              {item.strCategoryDescription.length > 200 ? (
                <>
                  {item.strCategoryDescription.split(" ").slice(0, 30).join(" ")}
                  <button
                    className="cursor-pointer text-yellow-900"
                    onClick={() => setSelectedCategory(item)}
                  >
                    {" >> "}
                  </button>
                </>
              ) : (
                item.strCategoryDescription
              )}
            </p>
            <Link className="text-gray-600" href={`/category/${item.strCategory}`}>
              View detail...
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-center gap-3 mt-5 items-center">
        <button className="cursor-pointer" onClick={prev} disabled={page === 1}>Prev</button>
        <span>
          {page} / {totalPages}
        </span>
        <button className="cursor-pointer" onClick={next} disabled={page === totalPages}>Next</button>
      </div>

      {selectedCategory && (
        <div
          className="fixed bg-black/90 w-[50%] min-h-[50vh] left-1/2 top-1/4 -translate-x-1/2 text-white rounded-md p-4"
          onClick={() => setSelectedCategory(null)}
        >
          <Image
            src={selectedCategory.strCategoryThumb}
            alt={selectedCategory.strCategory}
            width={300}
            height={300}
            priority
            quality={100}
          />
          <h4 className="text-yellow-600 font-bold">{selectedCategory.strCategory}</h4>
          <p>{selectedCategory.strCategoryDescription}</p>
        </div>
      )}
    </div>
  );
}
