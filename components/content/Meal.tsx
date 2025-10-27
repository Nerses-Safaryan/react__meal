'use client';

import Image from "next/image";

type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  [key: string]: string | null | undefined;
};

type Props = {
  meal: Meal;
};

export function Meal({ meal }: Props) {
  const ingredients: { ingredient: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push({
        ingredient: ing,
        measure: meas || "",
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-2xl">
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          width={300}
          height={300}
          className="object-cover shadow-md rounded-xl"
        />
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">{meal.strMeal}</h1>
          <ul className="text-gray-700">
            {ingredients.map((item, index) => (
              <li key={index}>
                {item.ingredient} — {item.measure}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
