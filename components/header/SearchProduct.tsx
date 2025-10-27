'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type MealResponse = {
  meals: Meal[] | null;
};

export function SearchProduct() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setMeals([]);
      return;
    }

    const fetchMeals = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        if (!res.ok) throw new Error("Failed to fetch meals");
        const data: MealResponse = await res.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, [query]);

  return (
    <div className="relative w-[250px]" ref={ref}>
      <input
        type="text"
        placeholder="Search meal..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        className="w-full border-b-2 outline-0 border-blue-300 p-1"
      />

      {open && meals.length > 0 && (
        <ul className="absolute bg-white w-full max-h-[300px] overflow-y-scroll shadow-md rounded-md mt-1 z-10">
          {meals.map((item) => (
            <li
              key={item.idMeal}
              className="flex gap-2 m-2 items-center hover:bg-gray-100 p-1 rounded"
            >
              <Image
                src={item.strMealThumb}
                alt={item.strMeal}
                width={50}
                height={50}
                className="rounded-md"
              />
              <Link
                href={`/meal/${item.idMeal}`}
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-blue-600"
              >
                {item.strMeal}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
