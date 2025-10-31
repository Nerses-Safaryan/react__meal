import CategoryList from "@/components/content/CategoryList";

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type CategoryResponse = {
  categories: Category[];
};

export default async function HomePage() {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
    { next: { revalidate: 60 } }
  );
  const data: CategoryResponse = await res.json();

  return (
    <div className="Home container p-4 m-auto">
      <h1 className="text-center text-3xl text-gray-800 font-semibold mb-3">
        Category list
      </h1>
      <CategoryList categories={data.categories} />
    </div>
  );
}
