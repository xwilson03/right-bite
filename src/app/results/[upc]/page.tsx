import SafetySpectrum from "@/components/SafetySpectrum";
import * as cheerio from "cheerio";

const typeToDanger: Record<string, number> = {
    "typeO" : 0,
    "typeN" : 1,
    "typeB" : 2,
    "typeA" : 3,
    "typeOP": 3,
    "typeNP": 4,
    "typeBP": 6,
    "typeAP": 8,
}

async function getData(upc: string) {

    const res: string = await (await fetch(`https://upcfoodsearch.com/search?s=${upc}`)).text();
    const $ = cheerio.load(res);
    const ingredientsContainer = $("#ingredientsStyled > p").find("a");

    const ingredients: {name: string, type: string, href: string}[] = [];
    var risk: number = 0;
    var total: number = ingredientsContainer.length;

    ingredientsContainer.each((i, el) => {
        if ($(el).attr('data-name')) {
            ingredients.push({
                name: $(el).attr('data-name')            || "",
                type: $(el).attr('class')?.split(" ")[0] || "",
                href: $(el).attr('href')                 || "",
            });

            // Scale ingredient risk weight by estimating mass percentage using ingredient order
            risk += typeToDanger[ingredients[i].type] * (total - i);
        }
    });

    // Normalize risk by scaling factor
    risk /= total; 

    // 3 is the current median value of typeToDanger
    const medianGrade: number = total * 3;

    const grade = (1 - (risk/medianGrade)) * 100;

    return {ingredients, grade};
}

export default async function Page({params: {upc}}: {params: {upc: string}}) {
    const {ingredients, grade} = await getData(upc);

    const bgGood = '#166534';
    const bgOkay = '#854d0e';
    const bgBad  = "#991b1b";

    return (
        <div className="p-4 grid gap-6">
            <SafetySpectrum grade={grade}/>
            <div className="flex flex-col w-1/3 overflow-scroll">
                <h2 className="font-semibold text-2xl mb-2 text-white">Ingredients</h2>
                <ul className="space-y-1">
                    {ingredients.map(({name, type, href}, i) => (
                        <li key={i} className="text-lg text-center p-1 text-zinc-100 rounded"
                            style={{ backgroundColor: (typeToDanger[type] > 4) ? bgBad
                                                    : (typeToDanger[type] > 1) ? bgOkay
                                                    : bgGood
                            }}>
                            <a target="_blank" href={href}>{name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export const revalidate = 60;
