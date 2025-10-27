import { MealList } from "@/components/content/MealList";



type Meal = {
    strMeal: string;
    strMealThumb: string;
    idMeal: string;
}


type MealsResponse = {
    meals: Meal[];
}

type Params = {
    params: Promise<{name: string}>
}


export default async function page({params}: Params) {

    const {name} = await params;

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
    if(!res.ok) throw new Error(`Failed to fetch meanls for category ${name}`);

    const data: MealsResponse = await res.json();


    return (
        <div>
            {/* { JSON.stringify(data) } */}
            <MealList meals={data.meals} />
        </div>
    )
}