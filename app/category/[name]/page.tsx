import { MealList } from "@/components/content/MealList";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strMealAlternate?: string | null;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strYoutube?: string;
  [key: string]: string | null | undefined;
};

type MealResponse = {
  meals: Meal[];
};

interface PageProps {
  params: { name: string }
}

export default async function Page({ params }: Params) {
  const { name } = params;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
  );
  if (!res.ok) throw new Error(`Failed to fetch meals for category ${name}`);

  const data: MealResponse = await res.json();

  return (
    <div>
      <MealList meals={data.meals} />
    </div>
  );
}
