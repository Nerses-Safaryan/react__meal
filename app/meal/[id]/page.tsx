import { Meal } from "@/components/content/Meal";

type MealType = {
  idMeal: string;
  strMeal: string;
  strMealAlternate?: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  [key: string]: string | null | undefined;
};

type MealResponse = {
  meals: MealType[];
};

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  if (!res.ok) throw new Error("Failed to fetch meal data");

  const data: MealResponse = await res.json();
  const meal = data.meals[0];

  return (
    <div>
      <Meal meal={meal} />
    </div>
  );
}
