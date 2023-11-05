## RightBite
We deployed our website on Vercel and have a custom domain name!
Try it out here: https://www.rightbite.co/

<img width="200" alt="image" src="https://github.com/xwilson03/right-bite/assets/91913752/2f8ba399-8028-492a-9bd3-affedf75f8a5">
<img width="200" alt="image" src="https://github.com/xwilson03/right-bite/assets/91913752/2f19e9b8-25f8-48ec-8a03-e2af24937b19">
<img width="200" alt="image" src="https://github.com/xwilson03/right-bite/assets/91913752/6cbddea8-4060-47da-aca3-bc16e52a9e44">
<img width="200" alt="image" src="https://github.com/xwilson03/right-bite/assets/91913752/f80a65e2-da20-476d-ae2d-b7968204ec64">

## Inspiration
Our inspiration for RightBite came from a shared commitment to food safety and informed eating. We recognized the need for a tool that empowers consumers to make healthier choices by providing essential safety information about the food they purchase.

## What it does
RightBite is a straightforward food safety awareness app. It allows users to scan product barcodes or input the barcode to receive key information about product ingredients. It assesses ingredient safety and provides a general safety rating for food items. Additionally, it displays an ingredient list ordered by proportion and flags potentially dangerous ingredients with harsher colors. Additionally, RightBite offers 1-2 sentence descriptions of each ingredient and their history, as well as manufacturer information for each product.

## How we built it
RightBite was built using a combination of technologies, including Typescript, Next.js, React.js, TailwindCSS, and Cheerio web-scraper to get product data in order to ensure a responsive and user-friendly interface. Additionally, we deployed the app on Vercel and configured it to our custom domain name from the GoDaddy Registry.

## Challenges we ran into
- We had to switch between multiple approaches of gathering product information using UPC.
- It also took multiple attempts to find a suitable React camera component as some were outdated and some were difficult to configure, but we finally found one that was able to successfully parse barcode information.
  
## Accomplishments that we're proud of
- We are proud of being able to figure out how to make the camera successfully scan a barcode.
- We're particularly proud of creating an app that puts the power of informed eating directly into the hands of consumers. RightBite has the potential to make a positive impact on the health and safety of individuals and communities in a fast, efficient way.
- We are also proud of being able to successfully register a domain name using GoDaddy Registry and deploying our app on Vercel.
- Lastly, half of the team had zero experience with the technology stack we used so there was a lot of fast-paced learning along the way.

## What we learned
- As mentioned previously, half of the team was new to the T3 stack and there was a steep learning curve. We are now able to confidently say that we understand Next.js.

## What's next for RightBite
- We want to be able to display macronutrient information so that the app is a one-stop shop for health and safety information of a product.
- Eventually, we want to convert our code to react-native code so it can be available as an app on all platforms.
- We want to be able to scan the barcodes of products without being confined to the products available with the UPC Food Searcher database. We would do this by implementing our own database instance and adding submission forms for any products that aren't already registered. 

## Technologies Used
- React.js, Next.js, Vercel, TypeScript, TailwindCSS, Cheerio Web Scraper with UPC Food Search.

<p align = "center">
<img alt="Next.js" src= "https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
<img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> 
<img alt="JavaScript" src= "https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
<img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
<img alt="TypeScript" src= "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img alt="TailwindCSS" src= "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
</p>
