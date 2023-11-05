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
    const pName = $("div.col-xs-12 col-sm-8 col-md-9 h1").text();
    const ingredientsContainer = $("#ingredientsStyled > p").find("a");
    const manufacturerElement = $('td:contains("Manufacturer")');
    const manufacturer = manufacturerElement.next().text().trim();

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

    // Low grade, low risk!
    const grade = (risk/medianGrade) * 100;

    return {pName, manufacturer, ingredients, grade};
}

export default async function Page({params: {upc}}: {params: {upc: string}}) {
    const {pName, manufacturer, ingredients, grade} = await getData(upc);

    const bgGood = '#166534';
    const bgOkay = '#854d0e';
    const bgBad  = "#991b1b";

    return (
        <div className="flex flex-col align-center items-center min-h-screen">
            <h1 className="pt-10 font-semibold text-center text-3xl mb-2 text-white"> {pName} </h1>
            <h3 className="pb-10 font-semibold text-2xl text-center mb-2 text-gray-400"> Manufacturer: {manufacturer} </h3>
            <SafetySpectrum grade={grade}/>
            <div className="pt-10 flex flex-col w-full">
                <h2 className="font-semibold text-center text-2xl mb-2 text-white">Ingredients</h2>
                <ul className="pt-4 flex flex-wrap justify-center gap-2 overflow-y-scroll max-h-48">
                    {ingredients.map(({name, type, href}, i) => (
                        <li key={i} className="text-lg text-center text-zinc-100 rounded"
                            style={{ backgroundColor: (typeToDanger[type] > 4) ? bgBad
                                                    : (typeToDanger[type] > 1) ? bgOkay
                                                    : bgGood
                            }}>
                            <a target="_blank" href={`/ingredients/${name.replace(/ /g, '-')}`} className="p-2 truncate">{name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export const revalidate = 60;
