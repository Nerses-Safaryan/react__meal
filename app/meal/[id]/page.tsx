import { Meal } from '@/components/content/Meal'
import React from 'react'


type Params = {
  params: Promise<{ id: string }>
}

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null,
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  [key: string]: string | number | null;
}

type MealResponse = {
  meals: Meal[]
}

export default async function page({ params }: Params) {

  const { id } = await params;
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  if (!res.ok) throw new Error(`Failed to fetch meal with id ${id}`)

  const data: MealResponse = await res.json();
  const meal = data.meals[0];

  return (
    <div>
      <Meal meal={meal} />
    </div>
  )
}