'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

  return (
    <div>
      <ul className="grid grid-cols-4 gap-5">
        {categories.map((item) => (
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
