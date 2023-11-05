import * as cheerio from "cheerio";


async function getData(name: string) {
    
    const res: string = await (await fetch(`https://upcfoodsearch.com/food-ingredients/${name}`)).text();
    const $ = cheerio.load(res);

    const h1Element = $('div.col-xs-12.col-sm-8.col-md-9').find('h1');
    const iName = h1Element.text();
    const description = $('p:has(strong)').next('p').text();
    const historySection = $('h2:contains("History")');
    const historyContent = historySection.next('p').text();
    
    console.log("name: " + iName);
    console.log("desc: " + description);
    console.log("hisSec: " + historySection);
    console.log("hisCon: " + historyContent);

    console.log("");

    return {iName, description, historyContent};
}

export default async function Page({params: {name}}: {params: {name: string}}) {
    const {iName, description, historyContent} = await getData(name);

    return (
        <div className="p-4 grid gap-6">
            <h1 className="font-semibold text-center text-3xl mb-2 text-white"> {iName} </h1>
            <h3 className="font-semibold text-2xl text-center mb-2 text-gray-400"> {description} </h3>
            
            <div className="flex flex-col w-full">
                <h2 className="font-semibold text-center text-2xl mb-2 text-white"> {historyContent} </h2>
            </div>
        </div>
    );
}

export const revalidate = 60;