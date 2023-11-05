import * as cheerio from "cheerio";


async function getData(name: string) {
    
    const res: string = await (await fetch(`https://upcfoodsearch.com/food-ingredients/${name}`)).text();
    const $ = cheerio.load(res);

    const h1Element = $('div.col-xs-12.col-sm-8.col-md-9').find('h1');
    const iName = h1Element.text();
    const description = $('p:has(strong)').next('p').text();
    const rowDiv = $('div.row');
    const historyHeading = rowDiv.find('h2.headingMargin:contains("History")');

    let historyContent = "";

    if (historyHeading.length > 0) {
        // Find the next "p" elements after the history heading
        const historyContentElements = historyHeading.nextUntil('h2');
        historyContent = historyContentElements.text();
    }
    
    return {iName, description, historyContent};
}

    

export default async function Page({params: {name}}: {params: {name: string}}) {
    const {iName, description, historyContent} = await getData(name);

    return (
        <div className="p-4 flex flex-col align-center items-center gap-6">
            <h1 className="font-semibold text-center text-3xl mb-2 text-white"> {iName} </h1>
            
            <div className="flex flex-col w-2/3 bg-zinc-600 rounded-lg">
                <h2 className="pt-6 font-semibold text-center text-2xl mb-2 text-white"> Description </h2>
                <p className="pt-4 pb-10 px-10 text-center"> {description} </p>
            </div>

            <div className="flex flex-col w-2/3 bg-zinc-600 rounded-lg">
                <h2 className="pt-6 font-semibold text-center text-2xl mb-2 text-white"> History </h2>
                <p className="pt-4 pb-10 px-10 text-center"> {historyContent} </p>
            </div>
        </div>
    );
}

export const revalidate = 60;