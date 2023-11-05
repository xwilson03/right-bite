import * as cheerio from "cheerio";

async function getData(upc: string) {
  const res: string = await (
    await fetch(`https://upcfoodsearch.com/search?s=${upc}`)
  ).text();
  const $ = cheerio.load(res);

  const ingredients: string[] = [];
  const links: string[] = [];
  const ingredientLinks = $("#ingredientsStyled > p").find("a");

  ingredientLinks.each((idx, el) => {
    ingredients.push($(el).text());
    if ($(el).attr("href")) {
      links.push($(el).attr("href") as string);
    }
  });

  console.log(ingredientLinks);

  ingredients.forEach((element) => {
    console.log(element);
  });

  return {
    data: {
      links,
      ingredients,
    },
  };
}

export default async function Page({
  params: { upc },
}: {
  params: { upc: string };
}) {
  const {
    data: { links, ingredients },
  } = await getData(upc);

  return (
    <div className="p-4 grid gap-6">
      <div className="bg-green-900 p-4 rounded-lg">
        <h2 className="font-semibold text-lg text-white">Safety Rating:</h2>
        <div className="flex justify-between mt-2">
          <span className="text-red-500">Unsafe</span>
          <span className="text-yellow-500">Moderate</span>
          <span className="text-green-500">Safe</span>
        </div>
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
            <div
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
              style={{
                width: "70%",
              }}
            />
          </div>
        </div>
        <p className="text-sm text-zinc-400 mt-2">
          This product is generally safe based on its ingredients.
        </p>
      </div>
      <div>
        <h2 className="font-semibold text-lg mb-2 text-white">Ingredients</h2>
        <ul className="space-y-1">
          {ingredients.map((ingredient, i) => (
            <li key={i} className="text-sm text-zinc-400">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-semibold text-lg mb-2 text-white">
          Product Information
        </h2>
        <p className="text-sm text-zinc-400">
          This is a brief description of the product. It&apos;s made by a
          company that has had no recalls or lawsuits.
        </p>
      </div>
    </div>
  );
}

export const revalidate = 60;
