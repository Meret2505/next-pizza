import {
  Container,
  Filters,
  ProductsGroupList,
  Stories,
  Title,
  TopBar,
} from "@/shared/components/shared";
import { Suspense } from "react";
import { findPizzas, GetSeaerchParams } from "@/shared/lib/find-pizzas";
export default async function Home({
  searchParams,
}: {
  searchParams: GetSeaerchParams;
}) {
  const categories = await findPizzas(searchParams);
  return (
    <main className="">
      <Container className={"mt-10"}>
        <Title text={"Все пиццы"} className={"font-extrabold"} size={"lg"} />
      </Container>
      <TopBar categories={categories} />
      <Stories />
      <Container className={"mt-10 pb-14"}>
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      products={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
