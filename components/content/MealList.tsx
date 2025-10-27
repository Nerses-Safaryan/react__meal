'use client';

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export type MealItem = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

type Props = {
  meals: MealItem[];
};

export function MealList({ meals }: Props) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(meals.length / itemsPerPage);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  const current = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return meals.slice(start, start + itemsPerPage);
  }, [page, meals]);

  return (
    <div className="p-3">
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
        {current.map((item) => (
          <div className="p-4 shadow-md rounded-md" key={item.idMeal}>
            <Image
              src={item.strMealThumb}
              alt={item.strMeal}
              priority
              width={200}
              height={300}
              style={{ objectFit: "cover", width: "100%" }}
              blurDataURL="/images/placeholder.jpg"
              quality={100}
            />
            <Link href={`/meal/${item.idMeal}`}>{item.strMeal}</Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-5 items-center">
        <button className="cursor-pointer" onClick={prev} disabled={page === 1}>
          Prev
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button className="cursor-pointer" onClick={next} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
