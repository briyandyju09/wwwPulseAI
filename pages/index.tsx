import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import toast from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
const { GoogleGenerativeAI } = require("@google/generative-ai");

export default function Home() {
  const [input, setInput] = useState('')
  const [first, setfirst] = useState(0)
  const [answer, setAnswer] = useState(false)
  const [heading, setHeading] = useState('PulseAI, Your Consumer Rights Companion...')
  const [subHeading, setSubHeading] = useState('Welcome to Pulse, the ultimate tool for making informed and smart food choices! 🚀')
  const [loading, setLoading] = useState(false)
  const [loadText, setLoadText] = useState(`Did you know that it's quite boring to wait...`)

  const waitingPrompts = [
    "Did you know? You look especially intelligent today!",
    "Fun fact: You always bring such great energy to everything you do.",
    "Fun fact: You always bring such great energy to everything you do.",
    "While you're waiting, remember that your creativity is inspiring!",
    "Did you know? Your problem-solving skills are top-notch.",
    "Just a reminder: Your hard work is really paying off.",
    "Did you know? You have a knack for making things better.",
    "While we're waiting, remember that your insight is truly valuable.",
    "Fun fact: You have a talent for turning challenges into opportunities.",
    "Did you know? Your enthusiasm is contagious.",
    "Just a reminder: Your positive attitude makes a difference every day.",
    "Did you know? Your smile lights up the room!",
    "Fun fact: Your eyes are absolutely mesmerizing.",
    "While you're waiting, just know you're on someone's mind.",
    "Did you know? Your laugh is the sweetest sound.",
    "Just a reminder: You make hearts skip a beat.",
    "Did you know? Every moment with you feels magical.",
    "While we're waiting, thinking about how amazing you are.",
    "Fun fact: You have the most charming personality.",
    "Did you know? Smiling whenever thinking of you."
  ];

  const getAnswerToast = async () => {
    const interval = setInterval(() => {
      setSubHeading(waitingPrompts[Math.floor(Math.random() * waitingPrompts.length)]);
    }, 2000);

    const getAnswer = new Promise(async (resolve, reject) => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://en.openfoodfacts.org/api/v0/product/${input}.json`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        clearInterval(interval);
        setLoading(false);

        if (data && data.product) {
          const product = data.product;
          const details = `
            Name: ${product.product_name || "N/A"}
            Brands: ${product.brands || "N/A"}
            Ingredients: ${product.ingredients_text || "N/A"}
            Allergens: ${product.allergens || "N/A"}
            Nutritional Grade: ${product.nutrition_grades || "N/A"}
            Eco Score: ${product.ecoscore_grade || "N/A"}
            Processed: ${product.ingredients_analysis_tags?.includes("en:ultra-processed-food") ? "Yes" : "No"}
            Carbon Footprint: ${product.nutriments["carbon-footprint_100g"] || "N/A"} g CO2 per 100g
            Vegan: ${product.labels_tags?.includes("en:vegan") ? "Yes" : "No"}
            Nutriments: 
              - Energy: ${product.nutriments.energy_kcal || "N/A"} kcal
              - Fat: ${product.nutriments.fat || "N/A"} g
              - Carbohydrates: ${product.nutriments.carbohydrates || "N/A"} g
              - Sugars: ${product.nutriments.sugars || "N/A"} g
              - Proteins: ${product.nutriments.proteins || "N/A"} g
              
          `;

          setHeading(product.product_name || "Product Details");
          setSubHeading(details);
          setAnswer(true);
        } else {
          setHeading("Product not found");
          setSubHeading("Please try again with a different product name.");
          setAnswer(true);
        }

        resolve('done');
      } catch (error) {
        clearInterval(interval);
        setLoading(false);
        setHeading("Error");
        setSubHeading("There was an error fetching the product details.");
        setAnswer(true);
        reject(error);
      }
    });

    toast.promise(
      getAnswer,
      {
        loading: <>{loadText}</>,
        success: <b>Here&apos;s your answer!</b>,
        error: <b>Could not answer :(</b>,
      }
    );
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center pt-5 justify-between ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {/* <p className="fixed hidden lg:block  left-0 top-0 w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get answers for the unknown
        </p> */}
        {/* <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div> */}
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20  after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 items-center">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl pb-3 font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                  {heading}
                </h1>
                <p className="max-w-auto text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto">
                  {subHeading}
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2 mx-auto" style={{ display: answer ? 'none' : undefined }}>
                <form className="flex space-x-2">
                  <input
                    onChange={(e) => setInput(e.target.value)}
                    onClick={() => {
                      if (first === 0) {
                        setInput('')
                        setfirst(1)
                      }
                    }}
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1 bg-gray-800 text-white border-gray-900"
                    type="text"
                    value={input}
                    placeholder="Enter a product barcode.."
                  />
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-white text-black"
                    type="submit"
                    data-umami-event="Question asked"
                    data-umami-event-question={input}
                    disabled={loading}
                    onClick={(e) => {
                      e.preventDefault()
                      getAnswerToast()
                    }}
                  >
                    {loading ? (
                      <div role="status">
                        <svg aria-hidden="true" className="w-3 h-3 mr-2	 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : ''}
                    Ask
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {/* <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Discover and deploy boilerplate example Next.js&nbsp;projects.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a> */}
      </div>
    </main>
  );
}
